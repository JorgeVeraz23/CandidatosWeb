export enum EnumTypeDocument {
  RUC = 0,
  DNI = 1,
  CED = 2,
}
  
export type GetTypeDocumentsCatalogueEntity = {
  value: number;
  label: "RUC" | "DNI" | "CED";
}
  