import { CreateDetailCatalogQuestionEntity, EditDetailCatalogQuestionEntity, ShowDetailCatalogQuestionEntity } from "../../entities/DetailCatalogQuestion/DetailCatalogQuestionEntity";

export default interface DetailCatalogQuestionRepository {
    getDetailCatalogQuestionById(id: number): Promise<EditDetailCatalogQuestionEntity>;
   
  }
  