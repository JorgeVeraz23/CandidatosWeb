import { QuestionApiModel, QuestionEntity, ResponseApi } from "app/api/domain/entities/QuestionRepository/QuestionEntity";
import QuestionRepository from "app/api/domain/repositories/QuestionRepository/QuestionRepository";
import { Delete, Post, Put, Get } from "app/api/httpClient/methodsClient";
import { QUESTION_PREFIX } from "app/api/urls/urls";
import { AxiosException } from "app/errors/exceptions";
import { GETDETAIL_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "app/api/urls/urls";
import { convertISODateToLocalDate } from "app/utils/utils";
import axiosClient from "app/api/httpClient/axiosClient";
export default class QuestionsFormRepositoryImpl implements QuestionRepository {
    private readonly token: string;
    constructor() {
        this.token = localStorage.getItem('token');
    }
    async getAllQuestions(): Promise<QuestionEntity[]> {
        return Get<QuestionApiModel[]>(QUESTION_PREFIX).then((response) => {
              // Aquí puedes agregar el console.log() para imprimir la respuesta
        console.log('Respuesta de la solicitud:', response);
            const result: QuestionEntity[] = response.map(data => ({
                idQuestionForm: data.idQuestionForm,
                idQuestionValidation: data.idQuestionValidation,
                idQuestionType: data.idQuestionType,
                idInspectionForm: data.idInspectionForm,
                idGroupQuestionForm: data.idGroupQuestionForm,
                questionTextEN: data.questionTextEN,
                questionTextES: data.questionTextES,
                isRequiredDesc: data.isRequired ? "SI" : "NO",
                isMultipleSelectDesc: data.isMultipleSelect ? "SI" : "NO",
                inReportPDFDesc: data.inReportPDF? "SI" : "NO",
                groupQuestionName: data.groupQuestionName,
                formName: data.formName,
                questionTypeName: data.questionTypeName,
                order: data.order,
                catalogName: data.catalogName,
            } as QuestionEntity))
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
    async getQuestionsFormById(id: number): Promise<QuestionEntity> {
        return Get<QuestionApiModel>(GETDETAIL_QUESTION(id))
        .then((response) => {
            const result: QuestionEntity = {
                idQuestionForm: response.idQuestionForm,
                idQuestionValidation: response.idQuestionValidation,
                idQuestionType: response.idQuestionType,
                idGroupQuestionForm: response.idGroupQuestionForm,
                questionTextEN: response.questionTextEN,
                questionTextES: response.questionTextES,
                isRequiredDesc: response.isRequired ? "SI" : "NO",
                isMultipleSelectDesc: response.isMultipleSelect ? "SI" : "NO",
                inReportPDFDesc: response.inReportPDF? "SI" : "NO",
                isRequired: response.isRequired,
                isMultipleSelect: response.isMultipleSelect,
                inReportPDF: response.inReportPDF,
                groupQuestionName: response.groupQuestionName,
                formName: response.formName,
                order: response.order,
                questionTypeName: response.questionTypeName,
                catalogName: response.catalogName
            };
            return result;
        }).catch(error => {
            console.log(error)
            throw new Error(AxiosException(error));
        });
    }
    async createQuestionForm(data: QuestionEntity): Promise<ResponseApi> {
        console.log('Datos enviados en la solicitud:', data);
        return await Post<ResponseApi>(`${QUESTION_PREFIX}/CreateNewQuestion`, {        
            // idQuestionForm: data.idQuestionForm ,
            idQuestionValidation: data.idQuestionValidation ?? 1,
            idQuestionType: data.idQuestionType ?? 1,
            idGroupQuestionForm: data.idGroupQuestionForm,
            idCatalogQuestion: data.idCatalogQuestion ?? 1,
            questionTextEN: data.questionTextEN,
            questionTextES: data.questionTextES,
            isRequired: data.isRequired ?? false,
            isMultipleSelect: data.isRequired ?? false,
            order: data.order,
            inReportPDF: data.inReportPDF ?? false,
        } as QuestionApiModel).then(async (response) => {
          return response;
        }).catch(error => {
        throw new Error(AxiosException(error));
        });
    }
    async editQuestionForm(data: QuestionEntity): Promise<boolean> {
      console.log('Datos enviados en la solicitud:', data);
        return await Put<boolean>(UPDATE_QUESTION, {
            idQuestionForm: data.idQuestionForm,
            idQuestionValidation: data.idQuestionValidation,
            idQuestionType: data.idQuestionType,
            idGroupQuestionForm: data.idGroupQuestionForm,
            idCatalogQuestion: data.idCatalogQuestion,
            questionTextEN: data.questionTextEN,
            questionTextES: data.questionTextES,
            isRequired: data.isRequired,
            isMultipleSelect: data.isRequired,
            order: data.order,
            inReportPDF: data.inReportPDF,
        } as QuestionApiModel).then(async (response) => {
          return response;
        }).catch(error => {
            console.error('Ocurrió un error al hacer la solicitud:', error);
          throw new Error(AxiosException(error));
        });
      }
      async deleteQuestionForm(id: number): Promise<boolean> {
        return await axiosClient.delete(DELETE_QUESTION(id), {
          headers: {
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
}