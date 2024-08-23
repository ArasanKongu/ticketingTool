// routes.ts
import express, { Router } from "express";
import NewTicketController from "../controller/newticket.controller";

class TicketRoutes {
  router = Router();
  controller = new NewTicketController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.get("/history", this.controller.getAll.bind(this.controller));
    this.router.post("/tickets", this.controller.create);
    this.router.get("/employee/:EmployeeNo", this.controller.getByEmployeeNo);
    this.router.get("/employeeDetails", this.controller.getAllEmployee);
  }
}
export default new TicketRoutes().router;
