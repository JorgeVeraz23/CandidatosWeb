import { CreateCandidatoEntity, EditCandidatoConDetalleEntity, EditCandidatoEntity, MostrarCandidatoConDetalleEntity, MostrarCandidatoEntity } from "../../entities/CandidatoEntities/CandidatoEntity";

export default interface CandidatoRepository {
    getAllCandidato(): Promise<MostrarCandidatoEntity[]>;
    getCandidatoById(idCandidato: number): Promise<EditCandidatoEntity>;
    getCandidatoConDetalleById(idCandidato: number): Promise<EditCandidatoConDetalleEntity>;
    createCandidato(data: CreateCandidatoEntity): Promise<boolean>;
    deleteCandidato(idCandidato: number): Promise<boolean>;
    editCandidato(data: EditCandidatoEntity): Promise<boolean>;
}