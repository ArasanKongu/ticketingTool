import { Router } from "express";
import UserController from "../controller/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.post("/signup", this.controller.signup);
    this.router.post("/login", this.controller.login);
    this.router.post("/set-super-admin", this.controller.setSuperAdmin.bind(this.controller));
    this.router.post("/logout", this.controller.logout);
    this.router.post("/addUser", (req, res)=> this.controller.addUser(req, res));
  }
}

export default new UserRoutes().router;
