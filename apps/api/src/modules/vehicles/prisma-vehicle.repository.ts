import { prisma } from "../../database/prisma";
import { VehicleSelect } from "../../generated/prisma/models";

import type { VehicleRepository } from "./vehicle.repository";

import type { CreateVehicleInput, UpdateVehicleInput } from "./vehicle.schema";

export class PrismaVehicleRepository implements VehicleRepository {
	async findByPlate(plate: string) {
		return prisma.vehicle.findFirst({
			where: {
				plate,
			},
		});
	}

	async findById(id: string) {
		return prisma.vehicle.findUnique({
			where: {
				id,
			},
		});
	}

	async create(data: CreateVehicleInput) {
		return prisma.vehicle.create({
			data,
		});
	}

	async list() {
		return prisma.vehicle.findMany({
			orderBy: {
				clientId: "asc",
			},
		});
	}

	async update(id: string, data: UpdateVehicleInput) {
		return prisma.vehicle.update({
			where: { id },
			data,
		});
	}

	async delete(id: string) {
		return prisma.vehicle.delete({
			where: {
				id,
			},
		});
	}
}
