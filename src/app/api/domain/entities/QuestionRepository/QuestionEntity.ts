export type QuestionApiModel = {
    idQuestionForm: number;
    idInspectionForm?: number;
    idGroupQuestionForm?: number;
    idQuestionType: number;
    idQuestionValidation: number;
    idCatalogQuestion: number;
    questionTextES: string;
    questionTextEN: string;
    isRequired: boolean;
    isMultipleSelect: boolean;
    order: number;
    inReportPDF: boolean;
    groupQuestionName: string;
    formName: string;
    questionTypeName: string;
    catalogName: string;
}
export type QuestionEntity = {
    idQuestionForm?: number;
    idInspectionForm?: number;
    idGroupQuestionForm?: number;
    idQuestionType?: number;
    idQuestionValidation?: number;
    idCatalogQuestion?: number;
    questionTextES: string;
    questionTextEN: string;
    isRequiredDesc: string;
    isMultipleSelectDesc: string;
    inReportPDFDesc: string;
    isRequired: boolean;
    isMultipleSelect: boolean;
    inReportPDF: boolean;
    groupQuestionName?: string;
    formName?: string;
    order: number;
    questionTypeName: string;
    catalogName: string;
}

export interface ResponseApi{
    message: string;
    success: boolean;
  }