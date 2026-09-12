import type { Customer } from "../../generated/prisma/client";

import type { CreateCustomerInput } from "./customer.schema";

export interface CustomerRepository {
	findByDocument(document: string): Promise<Customer | null>;

	findById(id: string): Promise<Customer | null>;

	create(data: CreateCustomerInput): Promise<Customer>;

	list(): Promise<Customer[]>;

	delete(id: string): Promise<Customer>;
}
