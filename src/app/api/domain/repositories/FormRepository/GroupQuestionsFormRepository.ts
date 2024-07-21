import { GroupQuestionsFormEntity } from "../../entities/FormEntities/GroupQuestionEntity";
export default interface GroupQuestionsFormRepository{
    getAllGroupQuestionsForms(): Promise<GroupQuestionsFormEntity[]>;
    getGroupQuestionsFormById(id: number): Promise<GroupQuestionsFormEntity>;
    createGroupQuestionsForm(data: GroupQuestionsFormEntity): Promise<boolean>;
    editGroupQuestionsForm(data: GroupQuestionsFormEntity): Promise<boolean>;
    deleteGroupQuestionsForm(id: number): Promise<boolean>;
}