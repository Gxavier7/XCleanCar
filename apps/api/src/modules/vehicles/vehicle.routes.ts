import type { FastifyInstance } from "fastify";

import { PrismaVehicleRepository } from "./prisma-vehicle.repository";

import { VehicleService } from "./vehicle.service";

import { VehicleController } from "./vehicle.controller";

export async function vehicleRoutes(app: FastifyInstance) {
	const repository = new PrismaVehicleRepository();

	const service = new VehicleService(repository);

	const controller = new VehicleController(service);

	app.get("/", controller.list);
	app.get("/:id", controller.findById);

	app.post("/", controller.create);

	app.put("/:id", controller.update);

	app.delete("/:id", controller.delete);
}
