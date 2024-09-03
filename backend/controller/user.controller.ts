import { Request, Response } from "express";
import Ajv from "ajv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseObject, StatusResponse } from "../types/response.type";
import SchemaValidate from "../utils/apiErrhandler";
import { userRepository } from "../repository/user.repository";
import User from "../models/user.model";
import { addTokenToBlacklist } from "../utils/tokenBlacklist";

const ajv = new Ajv();

export default class UserController {
  async signup(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.failed,
      message: "Invalid Parameter",
    };

    if (!req.body) {
      return res.status(400).json(responseObject);
    }

    try {
      const body = req.body as {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
        superAdminCode?: string;
        EmployeeNo: string;
      };

      console.log("Signup:", body);
      const { userName, email, password, confirmPassword, superAdminCode, EmployeeNo } = body;

      // Check if any admin exists in the database
      const existingAdmin = await userRepository.retrieve({ status: 2 });
      if (existingAdmin && superAdminCode !== await userRepository.getSuperAdminCode()) {
        responseObject.message = "Invalid Super Admin Code";
        return res.status(400).json(responseObject);
      }

      let schema = require("../schema/user/signup.schema.json");
      const validate = ajv.compile(schema);
      if (!validate(body)) {
        responseObject.error = SchemaValidate.schemaErrObject(validate.errors);
        return res.status(400).json(responseObject);
      }

      if (password !== confirmPassword) {
        responseObject.message = "Passwords do not match";
        return res.status(400).json(responseObject);
      }

      // Check if user with the same email or userName exists
      let existingUser = await userRepository.retrieve({ email });
      if (existingUser) {
        responseObject.message = "Email already exists";
        return res.status(400).json(responseObject);
      }

      existingUser = await userRepository.retrieve({ userName });
      if (existingUser) {
        responseObject.message = "Username already exists";
        return res.status(400).json(responseObject);
      }

      // Determine user status based on the presence of a Super Admin Code

      const newUser: User = {
        EmployeeNo,
        userName,
        email,
        password,
        superAdminCode,
        status: existingAdmin ? 1 : 2,
      };

      const user = await userRepository.save(newUser);
      if (!user) {
        responseObject.message = "Error in user creation";
        return res.status(500).json(responseObject);
      }

      responseObject.status = StatusResponse.success;
      responseObject.message = "User created successfully";
      return res.status(201).json(responseObject);
    } catch (error) {
      console.error("Error in signup", error);
      responseObject.message = "Internal Server Error";
      responseObject.error = error;
      return res.status(500).json(responseObject);
    }
  }
  async addUser(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.failed,
      message: "Invalid Parameter",
    };

    try {
      const { EmployeeNo, userName, email, password, confirmPassword } = req.body;
      const token = req.headers["x-access-token"] as string;

      // Verify token and check if the user is an admin
      const decoded = jwt.verify(token, "your-secret-key") as JwtPayload;

      if (!decoded || typeof decoded === "string" || !decoded.id) {
        responseObject.message = "Invalid Token or unauthorized access";
        return res.status(403).json(responseObject);
      }
      const user = await userRepository.retrieve({ id: decoded.id });
      if (user?.status !== 2) {
        responseObject.message = "Unauthorized access";
        return res.status(403).json(responseObject);
      }

      if (password !== confirmPassword) {
        responseObject.message = "Passwords do not match";
        return res.status(400).json(responseObject);
      }

      const newUser: User = {
        EmployeeNo,
        userName,
        email,
        password,
        status: 1, // Default status for regular users
      };

      const savedUser = await userRepository.save(newUser);
      responseObject.status = StatusResponse.success;
      responseObject.message = "User added successfully";
      responseObject.data = { user: savedUser };

      return res.status(201).json(responseObject);
    } catch (error) {
      console.error("Error in addUser", error);
      responseObject.message = "Internal Server Error";
      responseObject.error = error;
      return res.status(500).json(responseObject);
    }
  }

  async login(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.failed,
      message: "Invalid Parameter",
    };

    if (!req.body) {
      return res.status(400).json(responseObject);
    }

    try {
      const { email, password } = req.body as { email: string; password: string; };
      console.log("Login Request:", { email, password });

      let user = await userRepository.login(email, password);
      if (!user) {
        responseObject.message = "User not found or invalid password";
        return res.status(400).json(responseObject);
      }

      const token = jwt.sign({ id: user.id }, "your-secret-key", { expiresIn: 86400 });

      responseObject.status = StatusResponse.success;
      responseObject.message = "Login successful";
      responseObject.data = { accessToken: token, User: user };
      return res.status(200).json(responseObject);
    } catch (error) {
      console.error("Error in login", error);
      responseObject.message = "Internal Server Error";
      responseObject.error = error;
      return res.status(500).json(responseObject);
    }
  }

  async logout(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.success,
      message: "Logout successful",
    };

    try {
      const token = req.headers["x-access-token"] as string;
      console.log("dd", token);
      if (token) {
        addTokenToBlacklist(token);
        console.log(`Token blacklisted: ${token}`);
      } else {
        responseObject.message = "No token provided";
        responseObject.status = StatusResponse.failed;
        return res.status(400).json(responseObject);
      }

      return res.status(200).json(responseObject);
    } catch (error) {
      console.error("Error during logout", error);
      responseObject.status = StatusResponse.failed;
      responseObject.message = "Internal Server Error";
      responseObject.error = error;
      return res.status(500).json(responseObject);
    }
  }

  async setSuperAdmin(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.failed,
      message: "Invalid Parameter",
    };
    if (!req.body || !req.body.userId) {
      return res.status(400).json(responseObject);
    }
    try {
      const userId = req.body.userId;
      const superAdminCode = await userRepository.setSuperAdmin(userId);
      responseObject.status = StatusResponse.success;
      responseObject.message = "Super Admin set successfully";
      responseObject.data = { superAdminCode: superAdminCode };
      return res.status(200).json(responseObject);
    } catch (error) {
      console.error("Error in setSuperAdmin", error);
      responseObject.message = "Internal Server Error";
      responseObject.error = error;
      return res.status(500).json(responseObject);
    }
  }

  async getSuperAdminCode(req: Request, res: Response) {
    try {
      const superAdminCode = await userRepository.getSuperAdminCode();
      if (!superAdminCode) {
        return res.status(404).json({ message: "Super Admin code not found" });
      }
      return res.status(200).json({ superAdminCode: superAdminCode });
    } catch (error) {
      console.error("Error in getSuperAdminCode", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
