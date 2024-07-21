import { CreateCatalogQuestionEntity, EditCatalogQuestionEntity, ShowCatalogQuestionEntity } from "../../entities/CatalogQuestionEntities/CatalogQuestionEntity";

export default interface CatalogQuestionRepository {
    getAllCatalogQuestion(): Promise<ShowCatalogQuestionEntity[]>;
    createCatalogQuestion(data: CreateCatalogQuestionEntity): Promise<boolean>;
    deleteCatalogQuestion(id: number): Promise<boolean>;
  }