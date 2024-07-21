import { GetTypeDocumentsCatalogueEntity } from "../../entities/ClientEntities/GetTypeDocumentsCatalogueEntity";

export default interface GetTypeDocumentsCatalogueRepository{
    getTypeDocumentsCatalogueRepository(): Promise<GetTypeDocumentsCatalogueEntity[]>;
}
