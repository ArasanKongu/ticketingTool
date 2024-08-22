import { Request, Response, NextFunction } from "express";
import { newTicketRepository } from "../repository/newticket.respository";
import { NewTicketModel } from "../models/newticket.model";
import Ajv from "ajv";
import SchemaValidate from "../utils/apiErrhandler";
import { ResponseObject, StatusResponse } from "../types/response.type";
const ajv = new Ajv();

export default class NewTicketController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let responseObject: ResponseObject = {
        status: StatusResponse.failed,
        message: "Invalid Parameter",
      };

      const schema = require("../schema/newticket.schema.json");
      const validate = ajv.compile(schema);

      console.log(schema, "schema", req.body);
      const valid = validate(req.body);
      console.log("Request body:", valid); // Log the request body
      if (!valid) {
        responseObject.error = SchemaValidate.schemaErrObject(validate.errors);
        console.log("hii");
        return res.status(500).json(responseObject);
      }
      const ticket: NewTicketModel = req.body;

      res.status(201).json({
        message: "Ticket created successfully",
      });
      const result = await newTicketRepository.create(ticket);
      console.log("Result:", result); // Log the result
    } catch (error) {
      console.error("Error in create controller:", error); // Log the error
      next(error);
    }
  }

  async getByEmployeeNo(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeNo = req.params.EmployeeNo;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      if (!employeeNo) {
        console.error("Invalid employee number"); // Log invalid employee number error
        return res.status(400).json({ message: "Invalid employee number" });
      }
      console.log("employeeNo", employeeNo);

      const tickets = await newTicketRepository.getByEmployeeNo(employeeNo, limit, offset );
      const totalCount = await newTicketRepository.countByEmployeeNo(employeeNo);

      console.log("Tickets:", tickets);
      res.status(200).json({
        currentPage : page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems : totalCount,
        items: tickets
      });
    } catch (error) {
      console.error("Error in getByEmployeeNo controller:", error); // Log the error
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await newTicketRepository.getAll();
      console.log("Tickets:", tickets);
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error in getAll controller:", error); // Log the error
      next(error);
    }
  }

  async getAllEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await newTicketRepository.getAllEmpoyee();
      console.log("Tickets:", tickets);
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error in getAll controller:", error); // Log the error
      next(error);
    }
  }
}
