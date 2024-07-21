  
export type CatalogItem = {
    idCatalogQuestionItem: number,
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }

export type CreateCatalogQuestionEntity = {
    catalogName: string,
  }
    
  
  export type EditCatalogQuestionEntity = CreateCatalogQuestionEntity & {
    idCatalogQuestion: number
  }
  
  export type ShowCatalogQuestionEntity = {
    idCatalogQuestion: number
    catalogName: string,

  }
  