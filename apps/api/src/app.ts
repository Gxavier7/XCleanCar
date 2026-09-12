import Fastify from "fastify";
import cors from "@fastify/cors";

import { customerRoutes } from "./modules/customers/customer.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";

export async function buildApp() {
	const app = Fastify({
		logger: true,

		routerOptions: {
			ignoreTrailingSlash: true,
		},
	});

	await app.register(cors, {
		origin: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	});

	app.get("/health", async () => {
		return {
			status: "ok",
		};
	});

	await app.register(customerRoutes, {
		prefix: "/customers",
	});

	await app.register(vehicleRoutes, {
		prefix: "/vehicle",
	});

	return app;
}
