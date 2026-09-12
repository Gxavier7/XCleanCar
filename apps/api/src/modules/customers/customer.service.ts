import type { CustomerRepository } from "./customer.repository";

import type { CreateCustomerInput } from "./customer.schema";

import { CustomerDocumentAlreadyExistsError } from "./customer.errors";
import { string } from "zod";

export class CustomerService {
	constructor(private readonly repository: CustomerRepository) {}

	async create(data: CreateCustomerInput) {
		const existingCustomer = await this.repository.findByDocument(data?.cpf || "");

		if (existingCustomer) {
			throw new CustomerDocumentAlreadyExistsError();
		}

		return this.repository.create(data);
	}

	async findById(id: string) {
		return this.repository.findById(id);
	}

	async list() {
		return this.repository.list();
	}

	async delete(id: string) {
		return this.repository.delete(id);
	}
}
