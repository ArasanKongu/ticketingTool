import { Request, Response } from "express";
import Ajv from "ajv";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseObject, StatusResponse } from "../types/response.type";
import SchemaValidate from "../utils/apiErrhandler";
import { userRepository } from "../repository/user.repository";
import { User } from "../models/user.model";
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
                username: string;
                email: string;
                password: string;
                confirmPassword: string;
            };
            console.log("Signup:", body);

            let schema = require("../schema/user/signup.schema.json");
            const validate = ajv.compile(schema);
            if (!validate(body)) {
                responseObject.error = SchemaValidate.schemaErrObject(validate.errors);
                return res.status(400).json(responseObject);
            }

            const { username, email, password, confirmPassword } = body;

            if (password !== confirmPassword) {
                responseObject.message = "Passwords do not match";
                return res.status(400).json(responseObject);
            }

            let user = await userRepository.retrieve({
                email,
                status: 0
            });

            if (user) {
                responseObject.message = "User already exists";
                return res.status(400).json(responseObject);
            }

            // const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser: User = {
                username,
                email,
                password
                // password: hashedPassword,
            };

            user = await userRepository.save(newUser);

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

    async login(req: Request, res: Response) {
        let responseObject: ResponseObject = {
            status: StatusResponse.failed,
            message: "Invalid Parameter",
        };

        if (!req.body) {
            return res.status(400).json(responseObject);
        }

        try {
            const { email, password } = req.body as {
                email: string;
                password: string;
            };
            console.log("Login Request:", { email, password });

            let user = await userRepository.login(email, password);

            if (!user) {
                responseObject.message = "User not found or invalid password";
                return res.status(400).json(responseObject);
            }

            // const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (password !== user.password) {
                responseObject.message = "Invalid password";
                return res.status(400).json(responseObject);
            }

            const token = jwt.sign({ id: user.id }, "your-secret-key", {
                expiresIn: 86400, // 24 hours
            });

            responseObject.status = StatusResponse.success;
            responseObject.message = "Login successful";
            responseObject.data = { accessToken: token };

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
        }
        return res.status(200).json(responseObject);
    }
}
