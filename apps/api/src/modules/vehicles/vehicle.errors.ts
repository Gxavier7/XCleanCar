export class VehiclePlateAlreadyExistsError extends Error {
	constructor() {
		super("Já existe um veículo cadastrado com essa placa");

		this.name = "VehiclePlateAlreadyExistsError";
	}
}

export class VehicleNotFindError extends Error {
	constructor() {
		super("Nenhum veículo encontrado");

		this.name = "VehicleNotFindError";
	}
}
