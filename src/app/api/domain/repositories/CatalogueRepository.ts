import { CatalogueEntity, FormCatalog, QuestionInspectionFormEntity, CatalogueEntityInspector, CatalogueEntityInspectorEditActive } from "../entities/CatalogueEntity";

export default interface CatalogueRepository {
  getClients(): Promise<CatalogueEntity[]>;
  getRoles(): Promise<CatalogueEntity[]>;
  getInspectors(): Promise<CatalogueEntityInspector[]>;
  getInspectorsEditActive(user: string): Promise<boolean>;
  getInspectorsActive(): Promise<CatalogueEntity[]>
  getInspectionOrders(): Promise<CatalogueEntity[]>;
  getAllFormCatalogs(): Promise<FormCatalog[]>;
  getCatalogQuestionInspection(data: QuestionInspectionFormEntity): Promise<CatalogueEntity[]>;
}