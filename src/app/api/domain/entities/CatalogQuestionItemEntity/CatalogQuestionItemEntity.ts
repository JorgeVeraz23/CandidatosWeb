export type CreateCatalogQuestionItemEntity = {
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }
    
  
  export type EditCatalogQuestionItemEntity = CreateCatalogQuestionItemEntity & {
    idCatalogQuestionItem: number,
  }
  
  export type ShowCatalogQuestionItemEntity = {
    idCatalogQuestionItem: number,
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }