// import { CreatePartidoEntity, EditPartidoEntity,MostrarPartidoEntity } from "../../entities/PartidoEntities/PartidoEntity";

import { CrearPropuestaEntity, EditarPropuestaEntity, MostrarPropuestaEntity } from "../../entities/PropuestasEntities/PropuestaEntity";

export default interface PropuestaRepository {
    getAllPropuesta(): Promise<MostrarPropuestaEntity[]>;
    getPropuestaById(idPartido: number): Promise<EditarPropuestaEntity>;
    createPropuesta(data: CrearPropuestaEntity): Promise<boolean>;
    deletePropuesta(idPartido: number): Promise<boolean>;
    editPropuesta(data: EditarPropuestaEntity): Promise<boolean>;
}