import { z } from "zod";

const date = z.iso.date();

export const createVehicleSchema = z.object({
	plate: z
		.string()
		.trim()
		.min(7, "Placa deve possuir pelo menos 7 caracteres")
		.max(10, "Placa deve possuir no máximo 10 caracteres"),

	manufacturer: z
		.string()
		.trim()
		.min(2, "Fabricante deve possuir pelo menos 2 caracteres")
		.max(50, "Fabricante deve possuir no máximo 50 caracteres"),

	model: z
		.string()
		.trim()
		.min(2, "Modelo deve possuir pelo menos 2 caracteres")
		.max(50, "Modelo deve possuir no máximo 50 caracteres"),

	vehicleType: z.string().trim(),

	clientId: z.string().uuid("Cliente inválido"),
});

export const vehicleIdSchema = z.object({
	id: z.string().min(1, "Id do cliente é obrigatório"),
});

export const updateVehicleSchema = z.object({
	plate: z
		.string()
		.trim()
		.min(7, "Placa deve possuir pelo menos 7 caracteres")
		.max(10, "Placa deve possuir no máximo 10 caracteres")
		.optional(),

	manufacturer: z
		.string()
		.trim()
		.min(2, "Fabricante deve possuir pelo menos 2 caracteres")
		.max(50, "Fabricante deve possuir pelo menos 50 caracteres")
		.optional(),

	model: z
		.string()
		.trim()
		.min(2, "Modelo deve possuir pelo menos 2 caracteres")
		.max(50, "Modelo deve possuir pelo menos 50 caracteres")
		.optional(),

	vehicleType: z.string().trim().optional(),

	clientId: z.string().uuid("Cliente inválido").optional(),
});

export type VehicleIdInput = z.infer<typeof vehicleIdSchema>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
