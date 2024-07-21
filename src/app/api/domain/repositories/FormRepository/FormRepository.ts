import { CreateFormEntity,EditFormEntity, ShowFormEntity} from  "../../entities/FormEntities/FormEntity";

export default interface FormRepository {
  getAllForms(): Promise<ShowFormEntity[]>;
  getFormById(id: number): Promise<EditFormEntity>;
  createForm(data: CreateFormEntity): Promise<boolean>;
  editForm(data: EditFormEntity): Promise<boolean>;
  deleteForm(id: number): Promise<boolean>;
}
