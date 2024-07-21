import { QuestionEntity } from "../QuestionRepository/QuestionEntity";

export type GroupQuestionsFormEntity = {
    idGroupQuestionForm?:number,
    nameGroupES: string;
    nameGroupEN?: string;
    orderGroup: number; 
    idInspectForm?:number;
    nameInspectionForm?:string;
    questions?: QuestionEntity[];
}

export type GroupQuestionsFormApiModel = {
    idGroupQuestionForm?:number,
    nameGroupES: string;
    nameGroupEN?: string;
    orderGroup: number;
    idInspectionForm?:number;
    nameInspectionForm?:string;
}