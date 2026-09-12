import type { Vehicle } from "../../generated/prisma/client";

import type { CreateVehicleInput, UpdateVehicleInput } from "./vehicle.schema";

export interface VehicleRepository {
	findByPlate(plate: string): Promise<Vehicle | null>;

	findById(id: string): Promise<Vehicle | null>;

	create(data: CreateVehicleInput): Promise<Vehicle>;

	list(): Promise<Vehicle[]>;

	update(id: string, data: UpdateVehicleInput): Promise<Vehicle | null>;

	delete(id: string): Promise<Vehicle>;
}
