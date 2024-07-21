import { QuestionTypeEntity } from "../../entities/QuestionTypeEntities/QuestionTypeEntities";

export default interface QuestionTypeRepository{
    getQuestionTypeRepository(): Promise<QuestionTypeEntity[]>;
}
