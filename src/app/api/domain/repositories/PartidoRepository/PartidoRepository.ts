import { CreatePartidoEntity, EditPartidoEntity,MostrarPartidoEntity } from "../../entities/PartidoEntities/PartidoEntity";

export default interface PartidoRepository {
    getAllPartido(): Promise<MostrarPartidoEntity[]>;
    getPartidoById(idPartido: number): Promise<EditPartidoEntity>;
    createPartido(data: CreatePartidoEntity): Promise<boolean>;
    deletePartido(idPartido: number): Promise<boolean>;
    editPartido(data: EditPartidoEntity): Promise<boolean>;
}