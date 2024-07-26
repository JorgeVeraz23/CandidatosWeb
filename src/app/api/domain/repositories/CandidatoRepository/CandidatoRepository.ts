import { CreateCandidatoEntity, EditCandidatoEntity, MostrarCandidatoEntity } from "../../entities/CandidatoEntities/CandidatoEntity";

export default interface CandidatoRepository {
    getAllCandidato(): Promise<MostrarCandidatoEntity[]>;
    getCandidatoById(idCandidato: number): Promise<EditCandidatoEntity>;
    createCandidato(data: CreateCandidatoEntity): Promise<boolean>;
    deleteCandidato(idCandidato: number): Promise<boolean>;
    editCandidato(data: EditCandidatoEntity): Promise<boolean>;
}