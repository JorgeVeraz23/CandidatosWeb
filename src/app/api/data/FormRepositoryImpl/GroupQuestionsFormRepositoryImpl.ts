import { GroupQuestionsFormApiModel, GroupQuestionsFormEntity } from "app/api/domain/entities/FormEntities/GroupQuestionEntity";
import GroupQuestionsFormRepository from "app/api/domain/repositories/FormRepository/GroupQuestionsFormRepository";
import axiosClient from "app/api/httpClient/axiosClient";
import { GROUP_QUESTIONS_FORM_PREFIX } from "app/api/urls/urls";
import { AxiosException } from "app/errors/exceptions";
import { convertISODateToLocalDate } from "app/utils/utils";
export default class GroupQuestionsFormRepositoryImpl implements GroupQuestionsFormRepository {
    private readonly token: string;
    constructor() {
        this.token = localStorage.getItem('token');
    }
    async getAllGroupQuestionsForms(): Promise<GroupQuestionsFormEntity[]> {
        return axiosClient.get<GroupQuestionsFormApiModel[]>(GROUP_QUESTIONS_FORM_PREFIX, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then((response) => {
            const result: GroupQuestionsFormEntity[] = response.data.map(data => ({
                nameGroupES: data.nameGroupES,
                nameGroupEN: data.nameGroupEN,
                nameInspectionForm: data.nameInspectionForm,
                idInspectForm: data.idInspectionForm,
                orderGroup: data.orderGroup,
                idGroupQuestionForm: data.idGroupQuestionForm
            }))
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
    async getGroupQuestionsFormById(id: number): Promise<GroupQuestionsFormEntity> {
        return axiosClient.get<GroupQuestionsFormApiModel>(`${GROUP_QUESTIONS_FORM_PREFIX}/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then((response) => {
            const result: GroupQuestionsFormEntity = {
                nameGroupES: response.data.nameGroupES,
                nameGroupEN: response.data.nameGroupEN,
                idInspectForm: response.data.idInspectionForm,
                orderGroup: response.data.orderGroup,
                idGroupQuestionForm: response.data.idGroupQuestionForm
            };
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
    async createGroupQuestionsForm(data: GroupQuestionsFormEntity): Promise<boolean> {
        return await axiosClient.post<GroupQuestionsFormApiModel>(GROUP_QUESTIONS_FORM_PREFIX, {
            idGroupQuestionForm: data.idGroupQuestionForm,
            idInspectionForm: data.idInspectForm,
            orderGroup: data.orderGroup,
            nameGroupES: data.nameGroupES,
            nameGroupEN: data.nameGroupEN,
        } as GroupQuestionsFormApiModel, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        }).then(async (response) => {
          if (response.status == 200) {
            return true;
          } else {
            throw new Error(response.statusText);
          }
        }).catch(error => {
          throw new Error(AxiosException(error));
        });
    }
    async editGroupQuestionsForm(data: GroupQuestionsFormEntity): Promise<boolean> {
        return await axiosClient.put<GroupQuestionsFormApiModel>(GROUP_QUESTIONS_FORM_PREFIX, {
            idGroupQuestionForm: data.idGroupQuestionForm,
            idInspectionForm: data.idInspectForm,
            orderGroup: data.orderGroup,
            nameGroupES: data.nameGroupES,
            nameGroupEN: data.nameGroupEN,
        } as GroupQuestionsFormApiModel, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        }).then(async (response) => {
          if (response.status == 200) {
            return true;
          } else {
            throw new Error(response.statusText);
          }
        }).catch(error => {
          throw new Error(AxiosException(error));
        });
      }
    async deleteGroupQuestionsForm(id: number): Promise<boolean> {
        return axiosClient.delete(`${GROUP_QUESTIONS_FORM_PREFIX}/${id}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
            },
          }).then((response) => {
            if (response.status == 200) {
              return true;
            } else {
              throw new Error(response.statusText);
            }
          }).catch(error => {
            throw new Error(AxiosException(error));
          });
    }
}