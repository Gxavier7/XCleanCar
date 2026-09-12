import type { FastifyReply, FastifyRequest } from "fastify";

import { ZodError } from "zod";

import { createCustomerSchema, customerIdSchema } from "./customer.schema";

import { CustomerService } from "./customer.service";

import { CustomerDocumentAlreadyExistsError } from "./customer.errors";

export class CustomerController {
	constructor(private readonly service: CustomerService) {}

	create = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = createCustomerSchema.parse(request.body);

			const customer = await this.service.create(data);

			return reply.code(201).send(customer);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.code(400).send({
					message: error.issues[0]?.message ?? "Dados inválidos.",
					issues: error.issues,
				});
			}

			if (error instanceof CustomerDocumentAlreadyExistsError) {
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
			const { id } = customerIdSchema.parse(request.params);

			const customer = this.service.findById(id);

			if (!customer) {
				return reply.code(404).send({
					message: "Cliente não encontrado.",
				});
			}

			return reply.code(200).send(customer);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.code(400).send({
					message: error.issues[0]?.message ?? "Id inválido.",
					issues: error.issues,
				});
			}

			return reply.code(500).send({
				message: "Erro interno do servidor ao buscar o cliente.",
			});
		}
	};

	list = async (_request: FastifyRequest, reply: FastifyReply) => {
		const customers = await this.service.list();

		return reply.send(customers);
	};

	delete = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = customerIdSchema.parse(request.params);

			await this.service.delete(id);

			return reply.code(200).send({
				message: "Cliente deletado com sucesso!",
			});
		} catch (error) {
			return reply.code(500).send({
				message: "Erro interno do servidor ao deletar o cliente.",
			});
		}
	};
}
