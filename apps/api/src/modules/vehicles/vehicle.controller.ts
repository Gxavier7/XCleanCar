import type { FastifyReply, FastifyRequest } from "fastify";

import { ZodError } from "zod";

import { createVehicleSchema, vehicleIdSchema } from "./vehicle.schema";

import { VehicleService } from "./vehicle.service";

import { VehicleNotFindError, VehiclePlateAlreadyExistsError } from "./vehicle.errors";

export class VehicleController {
	constructor(private readonly service: VehicleService) {}

	create = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = createVehicleSchema.parse(request.body);

			const vehicle = await this.service.create(data);

			return reply.code(201).send(vehicle);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.code(400).send({
					message: error.issues[0]?.message ?? "Dados inválidos.",
					issues: error.issues,
				});
			}

			if (error instanceof VehiclePlateAlreadyExistsError) {
				return reply.code(409).send({
					message: error.message,
				});
			}

			request.log.error(error);

			return reply.code(500).send({
				message: "Erro interno do servidor.",
			});
		}
	};

	findById = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = vehicleIdSchema.parse(request.params);

			const vehicle = this.service.findById(id);

			if (!vehicle) {
				return reply.code(404).send({
					message: "Veículo não encontrado.",
				});
			}

			return reply.code(200).send(vehicle);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.code(400).send({
					message: error.issues[0]?.message ?? "Id inválido.",
					issues: error.issues,
				});
			}

			if (error instanceof VehicleNotFindError) {
				return reply.code(409).send({
					message: error.message,
				});
			}

			return reply.code(500).send({
				message: "Erro interno do servidor ao busvehicle o veículo.",
			});
		}
	};

	list = async (_request: FastifyRequest, reply: FastifyReply) => {
		const vehicles = await this.service.list();

		return reply.send(vehicles);
	};

	update = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = createVehicleSchema.parse(request.body);
			const { id } = vehicleIdSchema.parse(request.params);

			const vehicle = await this.service.update(id, data);

			return reply.code(200).send(vehicle);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.code(400).send({
					message: error.issues[0]?.message ?? "Id inválido.",
					issues: error.issues,
				});
			}

			return reply.code(500).send({
				message: "Erro interno do servidor ao atualizar o veículo.",
			});
		}
	};

	delete = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = vehicleIdSchema.parse(request.params);

			await this.service.delete(id);

			return reply.code(200).send({
				message: "Cliente deletado com sucesso!",
			});
		} catch (error) {
			return reply.code(500).send({
				message: "Erro interno do servidor ao deletar o veículo.",
			});
		}
	};
}
