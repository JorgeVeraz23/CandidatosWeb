import axiosClient from '../httpClient/axiosClient';
import InspectionFormRepository, { InspectionFormProps } from 'app/api/domain/repositories/InspectionFormRepository';
import { AxiosException } from 'app/errors/exceptions';
import { convertISODateToLocalDate, delay, getTodayDateStr } from 'app/utils/utils';
import {
    InspectionFormEntity,
    QuestionAnswerInspectionFormEntity,
    EditQuestionInspectionInspectionEntity,
    ImageInspectionEntity,
    GetAllInspectionFormByIdEntity
} from 'app/api/domain/entities/InspectionFormEntity';
import {
    GETALL_INSPECTIONFORM,
    GET_QUESTION_ANSWER,
    DELETE_INSPECTIONFORM,
    EDIT_QUESTION_ANSWER,
    GET_IMAGES_INSPECTION,
    DELETE_IMAGEINSPECTION,
    UPDATE_IMAGEINSPECTION,
    GETALL_INSPECTIONFORM_BYID
} from 'app/api/urls/urls';


export default class InspectionFormRepositoryImpl implements InspectionFormRepository {

    private readonly token: string;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    async getAllInspectionForm(filter: InspectionFormProps | void): Promise<InspectionFormEntity> {
        try {
            const params: any = {};

            if (filter && 'FromDate' in filter) {
                params.fromDate = filter.FromDate;
            } else {
                params.fromDate = getTodayDateStr(-5);
            }

            if (filter && 'ToDate' in filter) {
                params.toDate = filter.ToDate;
            } else {
                params.toDate = getTodayDateStr();
            }
            
            if(filter && 'IdInspectionForm' in filter){
                params.IdInspectionForm = filter.IdInspectionForm
            }

            const response = await axiosClient.get(GETALL_INSPECTIONFORM, {
                params,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            })

            if (response.status == 200) {

                const result: InspectionFormEntity = {
                    startDate: params.fromDate,
                    endDate: params.toDate,
                    IdInspectionForm: params.IdInspectionForm,
                    registers: []
                };

                for (const item of response.data) {
                    result.registers.push({
                        idRegistrationFormInspection: item.idRegistrationFormInspection,
                        idInspectionForm: item.idInspectionForm,
                        generationDate: convertISODateToLocalDate(item.generationDate),
                        codeOrder: item.codeOrder,
                        clientName: item.clientName,
                        inspectionType: item.inspectionType,
                        inspector: item.inspector,
                        stage: item.stage,
                        isSync: item.isSync
                    });
                }
                return result;
            }
            throw new Error(response.statusText);
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    //async getAllInspectionFormById 
    async getAllInspectionFormById(id: number): Promise<GetAllInspectionFormByIdEntity> {
        return await axiosClient.get(GETALL_INSPECTIONFORM_BYID(id), {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }).then(async (response) => {
          const result : GetAllInspectionFormByIdEntity = {
            idRegistrationFormInspection: response.data.idRegistrationFormInspection,
            idInspectionForm: response.data.idInspectionForm,
            generationDate: response.data.generationDate,
            codeOrder: response.data.codeOrder,
            clientName: response.data.clientName,
            inspectionType:  response.data.inspectionType,
            inspector: response.data.inspector,
            stage: response.data.stage,
            isSync: response.data.isSync,
          }
          return result;
        }).catch(error => {
          throw new Error(AxiosException(error));
        });
      }

    async getQuestionAnswerInspection(id: number): Promise<QuestionAnswerInspectionFormEntity> {
        return await axiosClient.get(`${GET_QUESTION_ANSWER}`, {
            params: {
                IdRegistrationFormInspection: id
            },
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            return response.data;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async editQuestionAnswerInspection(data: EditQuestionInspectionInspectionEntity): Promise<boolean> {
        try {
            const response = await axiosClient.put(EDIT_QUESTION_ANSWER, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });

            if (response.status === 200) {
                return true;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteInspectionForm(id: number): Promise<boolean> {
        try {
            const response = await axiosClient.delete(`${DELETE_INSPECTIONFORM}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            });

            if (response.status === 200) {
                return true;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async getImagesInspection(id: number): Promise<ImageInspectionEntity[]> {
        try {
            const response = await axiosClient.get(`${GET_IMAGES_INSPECTION}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
                params: {
                    IdRegistrationFormInspection: id
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteImageInspection(data: ImageInspectionEntity): Promise<boolean> {
        try {
            const response = await axiosClient.put(DELETE_IMAGEINSPECTION, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            if (response.status === 200) {
                return true;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async uploadImageInspection(data: FormData): Promise<boolean> {
        try {
            const response = await axiosClient.post(UPDATE_IMAGEINSPECTION, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            if (response.status === 200) {
                return true;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}