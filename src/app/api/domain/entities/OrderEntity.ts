export type CreateInspectionEntity = {
    idClient: number,
    emissionDate: string,
    expiratedDate: string
}

export type EditInspectionEntity = CreateInspectionEntity & {
    idOrder: number,
}

export type InspectionOrderEntity = {
    idOrder: number,
    code: string,
    clientName: string,
    emissionDate: string,
    expiratedDate: string,
    isPlanning: string
}
