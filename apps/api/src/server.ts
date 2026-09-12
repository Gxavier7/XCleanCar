import "dotenv/config";

import { buildApp } from "./app";

const host = process.env.API_HOST ?? "127.0.0.1";
const port = Number(process.env.API_PORT ?? 3333);

const app = await buildApp();

try {
	const address = await app.listen({
		port,
		host,
	});

	console.log(`API disponível em ${address}`);
} catch (error) {
	app.log.error(error);

	process.exit(1);
}
