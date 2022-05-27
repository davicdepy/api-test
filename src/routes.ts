import { Router } from "express";
import { prisma } from "./database/prismaClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";

import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const authenticateClienteController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

// Client Authenticate
routes.post("/client/authenticate", authenticateClienteController.handle);

// Deliveryman Authenticate
routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

// Create Client
routes.post("/client/", createClientController.handle);

// Create Deliveryman
routes.post("/deliveryman/", createDeliverymanController.handle);

// Get Clients
routes.get("/clients", async (req, res) => {
  const client = await prisma.clients.findMany();
  res.json(client);
});

// Get Deliveryman
routes.get("/deliveryman", async (req, res) => {
  const deliveryman = await prisma.deliveryman.findMany();
  res.json(deliveryman);
});

// Delete customer for your ID
routes.delete("/client/:id", async (req, res) => {
  const { id } = req.params;
  const client = await prisma.clients.delete({
    where: { id: String(id) },
  });
  res.json(client);
});

// Delete deliveryman for your ID
routes.delete("/deliveryman/:id", async (req, res) => {
  const { id } = req.params;
  const deliveryman = await prisma.deliveryman.delete({
    where: { id: String(id) },
  });
  res.json(deliveryman);
});

export { routes };
