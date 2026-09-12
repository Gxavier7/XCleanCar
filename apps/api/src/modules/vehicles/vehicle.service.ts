import { updateCustomerSchema } from "../customers/customer.schema";
import type { VehicleRepository } from "./vehicle.repository";

import type { CreateVehicleInput, UpdateVehicleInput } from "./vehicle.schema";

import { VehicleNotFindError, VehiclePlateAlreadyExistsError } from "./vehicle.errors";

import { string } from "zod";

export class VehicleService {
	constructor(private readonly repository: VehicleRepository) {}

	async create(data: CreateVehicleInput) {
		const existingVehicle = await this.repository.findByPlate(data?.plate || "");

		if (existingVehicle) {
			throw new VehiclePlateAlreadyExistsError();
		}

		return this.repository.create(data);
	}

	async findById(id: string) {
		const vehicle = this.repository.findById(id);

		if (!vehicle) {
			throw new VehicleNotFindError();
		}

		return vehicle;
	}

	async list() {
		return this.repository.list();
	}

	async update(id: string, data: UpdateVehicleInput) {
		return this.repository.update(id, data);
	}

	async delete(id: string) {
		return this.repository.delete(id);
	}
}
