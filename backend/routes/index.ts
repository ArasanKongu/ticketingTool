import { Application } from "express";
import userRoutes from "./user.routes";
import ticketRoutes from "./ticket.routes";
import userRolesRoutes from "./userRoles.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/user", userRoutes);
    app.use("/api", ticketRoutes);
    app.use("/api",userRolesRoutes)
  }
}
