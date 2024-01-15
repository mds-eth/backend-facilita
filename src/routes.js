import { Router } from "express";

import MapsController from "./app/controllers/MapsController";
import ClientsController from "./app/controllers/ClientsController";
import SessionController from "./app/controllers/SessionController";

import { clientSchema } from "./app/schemas/ClientSchema";
import { sessionSchema } from "./app/schemas/SessionSchema";

import middlewareJWT from "./app/middlewares/middlewareJWT";
import { middlewareValidation } from "./app/middlewares/middlewareValidation";

class Routes {
  constructor() {
    this.routes = Router();
    this.createRoutes();
  }

  createRoutes() {

    this.routes.post("/api/v1/session", middlewareValidation(sessionSchema), SessionController.createSession);

    this.routes.use(middlewareJWT);

    this.routes.get("/api/v1/clients", ClientsController.findAll);
    this.routes.get("/api/v1/clients/:clientId", ClientsController.findOne);
    this.routes.put("/api/v1/clients/:clientId", ClientsController.delete);
    this.routes.get("/api/v1/calculate-route", MapsController.calculateRoute);
    this.routes.post("/api/v1/clients", middlewareValidation(clientSchema), ClientsController.create);

    this.routes.post("*", (req, res) => {
      return res.status(404).json({ status: false, message: ">>>Route Not Found<<<" });
    });
    this.routes.get("*", (req, res) => {
      return res.status(404).json({ status: false, message: ">>>Route Not Found<<<" });
    });
    this.routes.put("*", (req, res) => {
      return res.status(404).json({ status: false, message: ">>>Route Not Found<<<" });
    });
    this.routes.delete("*", (req, res) => {
      return res.status(404).json({ status: false, message: ">>>Route Not Found<<<" });
    });
  }
}

export default new Routes().routes;
