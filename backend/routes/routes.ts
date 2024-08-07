// routes.ts
import express from "express";
import { NewTicketController } from "../controller/newticket.controller";

const router = express.Router();

router.get("/employee/:EmployeeNo", NewTicketController.getByEmployeeNo);

router.post("/tickets", NewTicketController.create);
router.delete("/tickets/:id", NewTicketController.delete);

export default router;
