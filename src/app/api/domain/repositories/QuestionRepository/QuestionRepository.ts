import { QuestionEntity, ResponseApi } from "../../entities/QuestionRepository/QuestionEntity";
export default interface QuestionRepository{
    getAllQuestions(): Promise<QuestionEntity[]>;
    getQuestionsFormById(id: number): Promise<QuestionEntity>;
    createQuestionForm(data: QuestionEntity): Promise<ResponseApi>;
    editQuestionForm(data: QuestionEntity): Promise<boolean>;
    deleteQuestionForm(id: number): Promise<boolean>;
}