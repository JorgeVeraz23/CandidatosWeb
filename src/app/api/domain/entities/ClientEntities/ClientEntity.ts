export enum EnumTypeDocument {
  RUC = 0,
  DNI = 1,
  CED = 2,
}
  
export type CreateClientEntity = {
  nameClient: string,
  typeDocument: EnumTypeDocument,
  dniNumber: string,
  textTypeDocument: string
}
  

export type EditClientEntity = CreateClientEntity & {
    idClient: number,
}

export type ShowClientEntity = {
    idClient: number,
    nameClient: string,
    typeDocument: EnumTypeDocument,
    textTypeDocument: string,
    dniNumber: string,
}
