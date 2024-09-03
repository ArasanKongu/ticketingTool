import { Router } from "express";
import UserRolesController from "../controller/userRoles.controller";

class UserRolesRoutes {
    router = Router();
    controller = new UserRolesController();

    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/userRoles", this.controller.createUserRole)
    }
}

export default new UserRolesRoutes().router;