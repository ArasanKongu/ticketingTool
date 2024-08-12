// routes.ts
import express, { Router } from "express";
import NewTicketController from "../controller/newticket.controller";

class TicketRoutes{
    router = Router()
    controller = new NewTicketController();

    constructor(){
        this.intializeRoutes()
    }
    intializeRoutes(){
        this.router.get('/history', this.controller.getAll.bind(this.controller))
        this.router.post('/tickets', this.controller.create)
        this.router.get('/employee/:EmployeeNo', this.controller.getByEmployeeNo)
}
// const router = express.Router();

// router.get("/employee/:EmployeeNo", NewTicketController.getByEmployeeNo);
// router.get("/history", NewTicketController.getAll)
// router.post("/tickets", NewTicketController.create);
}
export default new TicketRoutes().router;
