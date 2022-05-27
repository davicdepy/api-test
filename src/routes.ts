import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

const routes = Router();

const createClientController = new CreateClientController();
const autheticateClienteController = new AuthenticateClientController();

routes.post("/authenticate", autheticateClienteController.handle);

routes.post("/client/", createClientController.handle);

export { routes };
