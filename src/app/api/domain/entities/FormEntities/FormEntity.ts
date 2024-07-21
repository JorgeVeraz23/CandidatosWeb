  
export type CreateFormEntity = {
    nameES: string,
    nameEN: string,
    description: string
  }
    
  
  export type EditFormEntity = CreateFormEntity & {
    idInspectionForm: number
  }
  
  export type ShowFormEntity = {
    idInspectionForm: number,
    nameES: string,
    nameEN: string,
    description: string
  }
  