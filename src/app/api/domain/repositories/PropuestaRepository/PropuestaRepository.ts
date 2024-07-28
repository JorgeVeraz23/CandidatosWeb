// import { CreatePartidoEntity, EditPartidoEntity,MostrarPartidoEntity } from "../../entities/PartidoEntities/PartidoEntity";

import { CrearPropuestaEntity, EditarPropuestaEntity, MostrarPropuestaEntity } from "../../entities/PropuestasEntities/PropuestaEntity";

export default interface PropuestaRepository {
    getAllPropuesta(): Promise<MostrarPropuestaEntity[]>;
    getPropuestaById(idPropuesta: number): Promise<EditarPropuestaEntity>;
    createPropuesta(data: CrearPropuestaEntity): Promise<boolean>;
    deletePropuesta(idPropuesta: number): Promise<boolean>;
    editPropuesta(data: EditarPropuestaEntity): Promise<boolean>;
}