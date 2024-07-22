import { CreateCargoEntity, EditCargoEntity, MostrarCargoEntity } from "../../entities/CargoEntities/CargoEntity";

export default interface CargoRepository {
    getAllCargo(): Promise<MostrarCargoEntity[]>;
    getCargoById(idCargo: number): Promise<EditCargoEntity>;
    createCargo(data: CreateCargoEntity): Promise<boolean>;
    deleteCargo(idCargo: number): Promise<boolean>;
    editCargo(data: EditCargoEntity): Promise<boolean>;
}