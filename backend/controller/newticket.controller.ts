// controllers/newticket.controller.ts
import { Request, Response, NextFunction } from "express";
import { newTicketRepository } from "../repository/newticket.respository";
import { NewTicketModel } from "../models/newticket.model";

export class NewTicketController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Request body:", req.body); // Log the request body
      const ticket: NewTicketModel = req.body;
      res.status(201).json({
        message: "Ticket created successfully",
        // ticketId: result.insertId,
      });
      const result = await newTicketRepository.create(ticket);
      console.log("Result:", result); // Log the result
    } catch (error) {
      console.error("Error in create controller:", error); // Log the error
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = parseInt(req.params.id, 10);
      if (isNaN(ticketId)) {
        console.error("Invalid ticket ID"); // Log invalid ID error
        return res.status(400).json({ message: "Invalid ticket ID" });
      }

      const result = await newTicketRepository.delete(ticketId);
      console.log("Delete result:", result); // Log the delete result
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      console.error("Error in delete controller:", error); // Log the error
      next(error);
    }
  }
}
