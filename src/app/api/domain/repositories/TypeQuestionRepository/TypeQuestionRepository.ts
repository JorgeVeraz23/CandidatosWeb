import { CreateQuestionEntity,EditQuestionEntity, ShowQuestionEntity} from  "../../entities/TypeQuestionEntities/TypeQuestionsEntity";

export default interface TypeQuestionRepository {
  createTypeQuestion(data: CreateQuestionEntity): Promise<boolean>;
  deleteTypeQuestion(id: number): Promise<boolean>;
}