import { NextFunction, Request, Response } from "express";
import { ResponseObject, StatusResponse } from "../types/response.type";
import SchemaValidate from "../utils/apiErrhandler";
import Ajv from "ajv";
import { UserRoles } from "../models/newticket.model";
import { userRolesRepository } from "../repository/userRoles.repository";

const ajv = new Ajv();

export default class UserRolesController {
    async createUserRole(req: Request, res: Response, next: NextFunction) {
        try {
            let responseObject: ResponseObject = {
                status: StatusResponse.failed,
                message: 'Invalid Parameter',
            };
            const schema = require('../schema/user/userRoles.schema.json');
            const validate = ajv.compile(schema);
            console.log(schema, "schema", req.body);
            const valid = validate(req.body);
            console.log("Request body:", valid);
            if (!valid) {
                responseObject.error = SchemaValidate.schemaErrObject(validate.errors);
                console.log("first");
                return res.status(500).json(responseObject);
            }
            const roles: UserRoles = req.body;

            res.status(201).json({
                message: "User Role assigned successfully",
            });
            const result = await userRolesRepository.createUserRole(roles);
            console.log("Result:", result);
        } catch (error) {
            console.error("Error in create controller:", error);
            next(error);
        }
    }
}