export class CustomerDocumentAlreadyExistsError extends Error {
	constructor() {
		super("Já existe um cliente cadastrado com esse cpf.");

		this.name = "CustomerDocumentAlreadyExistsError";
	}
}
