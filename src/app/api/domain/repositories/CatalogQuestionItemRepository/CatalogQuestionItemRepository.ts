import {CreateCatalogQuestionItemEntity, EditCatalogQuestionItemEntity, ShowCatalogQuestionItemEntity } from "../../entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity";
import { EditDetailCatalogQuestionEntity } from "../../entities/DetailCatalogQuestion/DetailCatalogQuestionEntity";

export default interface CatalogQuestionItemRepository {
    getCatalogQuestionItemById(id: number): Promise<EditCatalogQuestionItemEntity>;
    getDetailCatalogQuestionItemById(id: number): Promise<EditDetailCatalogQuestionEntity>;
    createCatalogQuestionItem(data: CreateCatalogQuestionItemEntity): Promise<boolean>;
    deleteCatalogQuestionItem(id: number): Promise<boolean>;
  }
  