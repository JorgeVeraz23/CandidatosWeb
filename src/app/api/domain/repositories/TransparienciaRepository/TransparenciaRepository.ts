import { CrearTransparienciaEntity, EditarTransparienciaEntity, MostrarTransparienciaEntity } from "../../entities/TransparienciaEntities/TransparienciaEntity";


export default interface TransparenciaRepository {
    getAllTransparencia(): Promise<MostrarTransparienciaEntity[]>;
    getTransparenciaById(idTransparencia: number): Promise<EditarTransparienciaEntity>;
    createTransparencia(data: CrearTransparienciaEntity): Promise<boolean>;
    deleteTransparencia(idTransparencia: number): Promise<boolean>;
    editTransparencia(data: EditarTransparienciaEntity): Promise<boolean>;
}