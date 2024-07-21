  
export type CatalogItem = {
    idCatalogQuestionItem: number,
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }

export type CreateDetailCatalogQuestionEntity = {
    catalogName: string,
    itemCatalogs: CatalogItem[]
  }
    
  
  export type EditDetailCatalogQuestionEntity = CreateDetailCatalogQuestionEntity & {
    idCatalogQuestion: number
  }
  
  export type ShowDetailCatalogQuestionEntity = {
    idCatalogQuestion: number
    catalogName: string,
    itemCatalogs: CatalogItem[]
  }
  