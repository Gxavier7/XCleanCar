import type { FastifyInstance } from "fastify";

import { PrismaCustomerRepository } from "./prisma-customer.repository";

import { CustomerService } from "./customer.service";

import { CustomerController } from "./customer.controller";

export async function customerRoutes(app: FastifyInstance) {
	const repository = new PrismaCustomerRepository();

	const service = new CustomerService(repository);

	const controller = new CustomerController(service);

	app.get("/", controller.list);
	app.get("/:id", controller.findById);

	app.post("/", controller.create);

	app.delete("/:id", controller.delete);
}
