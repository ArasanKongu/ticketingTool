import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class AuthenticationMiddleware {
  async accessAuthorization(req: Request, res: Response, next: NextFunction) {
    console.log(`Access authorization for path:${req.path}`);
    if (req.path === "/signup" || req.path === "/login") {
      console.log("Skipping token check for signup or login");
      return next();
    }
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      console.log("No Token provided");
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        console.log("Unauthorized: Invalid token");
        return res.status(401).send({ message: "Unauthorized!" });
      }

      next();
    });
  }
}

// import { Request, Response } from "express";
// import { ResponseObject, StatusResponse } from "../types/response.type";
// // import { accessKeyRepository } from "../repository/accessKey.repository";
// import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
// import { AuthenticationConfig, AuthenticationParams } from "../lib/auth/config";
// import { ActiveStatus } from "../types/enum.types";
// // import { adminUserRepository } from "../repository/adminUser.repository";
// // import AdminUserModel from "../models/adminUser.model";
// // import { adminLoginTokenRepository } from "../repository/adminLoginToken.repository";

// export default class AuthenticationMiddleware {
//     async accessAuthorization(req: Request, res: Response, next: Function) {
//         const access_key = req.headers['x-access-key'];
//         // console.log("Access Key:", access_key);

//         let responseObject: ResponseObject = {
//             status: StatusResponse.failed,
//             message: "Invalid Parameter",
//         }

//         if (!access_key) {
//             responseObject.message = "Invalid Access Key";
//             responseObject.status = StatusResponse.authenticationFailed;
//             return res.status(401).json(responseObject);
//         }

//         try {
//             let accessKey = await accessKeyRepository.getByAccessKey({ access_key: access_key.toString() });

//             if (!accessKey) {
//                 responseObject.message = "Invalid Access Key";
//                 responseObject.status = StatusResponse.authenticationFailed;
//                 return res.status(401).json(responseObject);
//             }
//             // console.log("Access key :",accessKey);

//             next();
//         } catch (error) {
//             console.error("Authentication Middleware Error:", error);
//             responseObject.message = "Internal Server Error";
//             res.status(500).json(responseObject);
//         }
//     }

//     async userAuthorization(req: Request, res: Response, next: Function) {
//         const authorization = req.headers['authorization'];
//         // console.log("Authorization:", authorization);

//         let responseObject: ResponseObject = {
//             status: StatusResponse.authenticationFailed,
//             message: "Invalid Authentication",
//         }

//         if (!authorization) {
//             return res.status(403).send(responseObject);
//         }

//         try {
//             try {
//                 const loginToken = await adminLoginTokenRepository.reteriveAll({ token: authorization, status: ActiveStatus.active });
//                 if (!loginToken || loginToken.length <= 0) {
//                     responseObject.message = "Invalid Authentication";
//                     return res.status(403).send(responseObject);
//                 }

//                 const decoded: AuthenticationParams = jsonwebtoken.verify(authorization.toString(), AuthenticationConfig.secret) as AuthenticationParams;
//                 // console.log("Decode Data:", decoded);

//                 let user: AdminUserModel = await adminUserRepository.reterive({ id: decoded.id, status: 1 });
//                 if (!user) {
//                     responseObject.message = "Invalid Authentication";
//                     return res.status(403).send(responseObject);
//                 }
//                 req.context = { user };

//                 next();
//             } catch (error) {
//                 // console.error("JWT Verify Middleware Error:", error);

//                 responseObject.status = StatusResponse.authenticationFailed;

//                 if (error instanceof JsonWebTokenError) {
//                     // This block will handle JsonWebTokenError
//                     console.error("JWT Verify Middleware Error:", error.message);

//                     responseObject.error = error.name;
//                     responseObject.message = "Invalid Authentication";

//                     // Handle the error as needed
//                     return res.status(401).json(responseObject);
//                 }

//                 responseObject.message = "Internal Server Error";
//                 return res.status(500).json(responseObject);
//             }
//         } catch (error) {
//             console.error("User Authentication Middleware Error:", error);
//             responseObject.message = "Internal Server Error";
//             responseObject.status = StatusResponse.authenticationFailed;
//             res.status(500).json(responseObject);
//         }
//     }
// }