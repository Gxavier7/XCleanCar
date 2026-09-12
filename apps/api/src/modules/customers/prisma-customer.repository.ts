import { prisma } from "../../database/prisma";

import type { CustomerRepository } from "./customer.repository";

import type { CreateCustomerInput } from "./customer.schema";

export class PrismaCustomerRepository implements CustomerRepository {
	async findByDocument(cpf: string) {
		return prisma.customer.findUnique({
			where: {
				cpf,
			},
		});
	}

	async findById(id: string) {
		return prisma.customer.findUnique({
			where: {
				id,
			},
		});
	}

	async create(data: CreateCustomerInput) {
		return prisma.customer.create({
			data,
		});
	}

	async list() {
		return prisma.customer.findMany({
			orderBy: {
				name: "asc",
			},
		});
	}

	async delete(id: string) {
		return prisma.customer.delete({
			where: {
				id,
			},
		});
	}
}
