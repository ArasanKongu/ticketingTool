import { Application } from "express";
import userRoutes from "./user.routes";
import ticketRoutes from "./ticket.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/user", userRoutes);
    app.use("/api/ticket", ticketRoutes);
  }
}
