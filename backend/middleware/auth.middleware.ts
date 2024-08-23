import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../utils/tokenBlacklist";

export default class AuthenticationMiddleware {
  async accessAuthorization(req: Request, res: Response, next: NextFunction) {
    console.log(`Access authorization for path: ${req.path}`);

    if (req.path === "/signup" || req.path === "/login") {
      console.log("Skipping token check for signup or login");
      return next();
    }

    const token = req.headers["x-access-token"] as string;

    if (!token) {
      console.log("No Token provided");
      return res.status(403).send({ message: "No token provided!" });
    }

    if (isTokenBlacklisted(token)) {
      console.log("Unauthorized: Token is blacklisted");
      return res.status(401).send({ message: "Unauthorized!" });
    }

    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        console.log("Unauthorized: Invalid token");
        return res.status(401).send({ message: "Unauthorized!" });
      }

      (req as any).user = decoded;
      next();
    });
  }
}
