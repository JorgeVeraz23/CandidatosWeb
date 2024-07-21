import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
import { GetTypeDocumentsCatalogueEntity } from 'app/api/domain/entities/ClientEntities/GetTypeDocumentsCatalogueEntity';
import { QuestionTypeEntity } from 'app/api/domain/entities/QuestionTypeEntities/QuestionTypeEntities';
import QuestionTypeRepository from 'app/api/domain/repositories/QuestionTypeRepository/QuestionTypeRepository';
import { GETALL_TYPE_QUESTION } from 'app/api/urls/urls';

export default class getQuestionTypeRepositoryImpl implements QuestionTypeRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  async getQuestionTypeRepository(): Promise<QuestionTypeEntity[]> {
    return await axiosClient.get(GETALL_TYPE_QUESTION, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result: QuestionTypeEntity[] = [];
      for (const item of response.data) {
        result.push({
          value: item.idQuestionType,
          label: item.questionTypeName
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  

}