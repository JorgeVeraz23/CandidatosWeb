export type CreateQuestionEntity = {
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }
    
  
  export type EditQuestionEntity = CreateQuestionEntity & {
    idCatalogQuestionItem: number
  }
  
  export type ShowQuestionEntity = {
    idCatalogQuestionItem: number
    idCatalogQuestion: number,
    itemName: string,
    description: string,
    order: number
  }
  