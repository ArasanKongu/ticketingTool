import { Router } from "express";
import UserController from "../controller/user.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes()
    }
    intializeRoutes() {
        this.router.post("/signup", this.controller.signup);
        this.router.post("/login", this.controller.login);
    }
}

export default new UserRoutes().router;
