export type CatalogueEntity = {
    value: string,
    label: string
}

export type CatalogueEntityInspector = {
    value: string,
    label: string,
    active: boolean,
    username: string,
}

export type CatalogueEntityInspectorEditActive = {
    label: string,
}

export type FormCatalog = {
    idCatalogQuestion: number,
    catalogName: string,
    itemCatalogs: CatalogueEntity[]
}

export type QuestionInspectionFormEntity = {
    idRegistrationInspectionForm: number,
    typeText: string,
}

