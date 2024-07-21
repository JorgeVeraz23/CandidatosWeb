export type BaseInspectionFromEntity = {
    idRegistrationFormInspection: number,
    idInspectionForm: number,
    generationDate: string,
    codeOrder: string,
    clientName: string,
    inspectionType: string,
    inspector: string,
    stage: string,
    isSync: string
}

export type InspectionFormEntity = {
    startDate: string;
    endDate: string;
    IdInspectionForm: number;
    registers: BaseInspectionFromEntity[]
}

export type QuestionAnswerInspectionFormEntity = {
    idInspectionForm: number,
    idRegistrationFormInspection: number,
    nameInspectionForm: string,
    nameInspector: string,
    groups: QuestionGroups[]
}

type QuestionGroups = {
    idGroupQuestionForm: number,
    nameGroupEN: string,
    nameGroupES: string,
    orderGroup: number,
    questions: QuestionForm[]
}

type QuestionForm = {
    idQuestionForm: number,
    idCatalogQuestion: number,
    typeText: string,
    order: number,
    questionTextEN: string,
    questionTextES: string
    valueResponse: string,
    isRequired: boolean,
}

export type EditQuestionInspectionInspectionEntity = {
    idRegistrationInspectionForm: number,
    questions: EditQuestion[]
}

export type EditQuestion = {
    idQuestion: number;
    idCatalogQuestion: number | null;
    questionText: string;
    typeText: string;
    response: string;
    nameGroup: string;
    isRequired: boolean;
}


export type ImageInspectionEntity = {
    idFileBucket: number;
    idRegistrationFormFile: number;
    urlAccess: string;
}

export type CreateFakeInspectionFormEntity = {
    idInspectionForm: number,
    generationDate: string,
    codeOrder: string,
    clientName: string,
    inspectionType: string,
    inspector: string,
    stage: string,
    isSync: string
}

export type GetAllInspectionFormByIdEntity = CreateFakeInspectionFormEntity & {
    idRegistrationFormInspection: number,
}


