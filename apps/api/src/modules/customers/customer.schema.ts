import { z } from "zod";

const date = z.iso.date();

export const createCustomerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(5, "Nome deve possuir pelo menos 3 caracteres")
		.max(120, "Nome deve possuir no máximo 120 caracteres"),

	cpf: z
		.string()
		.trim()
		.min(11, "CPF inválido, deve possuir pelomenos 11 caracteres")
		.max(15, "CPF inválido, deve possuir no máximo 15 caracteres")
		.optional(),

	phone: z
		.string()
		.trim()
		.max(30, "Telefone deve possuir no máximo 30 caracteres")
		.regex(/^\d+$/, "Telefone deve possuir apenas números"),

	email: z
		.string()
		.trim()
		.email("E-mail inválido")
		.max(60, "E-mail deve possuir no máximo 60 caracteres")
		.optional(),

	state: z
		.string()
		.trim()
		.min(2, "Estado deve possuir no mínimo 2 caracteres")
		.max(30, "Estado deve possuir no máximo 30 caracteres")
		.optional(),

	address: z.string().trim().max(120, "Endereço deve possuir no máximo 120 caracteres").optional(),

	city: z.string().trim().max(60, "Cidade deve possuir no máximo 60 caracteres").optional(),

	reference: z
		.string()
		.trim()
		.max(60, "Referencia deve possuir no máximo 60 caracteres")
		.optional(),

	birthdate: z.iso
		.date()
		.transform((value) => new Date(`${value}T00:00:00.000Z`))
		.optional(),
});

export const customerIdSchema = z.object({
	id: z.string().min(1, "Id do cliente é obrigatório"),
});

export const updateCustomerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(5, "Nome deve possuir pelo menos 3 caracteres")
		.max(120, "Nome deve possuir no máximo 120 caracteres")
		.optional(),

	cpf: z
		.string()
		.trim()
		.min(11, "CPF inválido, deve possuir pelomenos 11 caracteres")
		.max(15, "CPF inválido, deve possuir no máximo 15 caracteres")
		.optional(),

	phone: z
		.string()
		.trim()
		.max(30, "Telefone deve possuir no máximo 30 caracteres")
		.regex(/^\d+$/, "Telefone deve possuir apenas números")
		.optional(),

	email: z
		.string()
		.trim()
		.email("E-mail inválido")
		.max(60, "E-mail deve possuir no máximo 60 caracteres")
		.optional(),

	state: z
		.string()
		.trim()
		.min(2, "Estado deve possuir no mínimo 2 caracteres")
		.max(30, "Estado deve possuir no máximo 30 caracteres")
		.optional(),

	address: z.string().trim().max(120, "Endereço deve possuir no máximo 120 caracteres").optional(),

	city: z.string().trim().max(60, "Cidade deve possuir no máximo 60 caracteres").optional(),

	reference: z
		.string()
		.trim()
		.max(60, "Referencia deve possuir no máximo 60 caracteres")
		.optional(),

	birthdate: z.iso
		.date()
		.transform((value) => new Date(`${value}T00:00:00.000Z`))
		.optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
