import axiosClient from '../../httpClient/axiosClient';
import TypeQuestionRepository from 'app/api/domain/repositories/TypeQuestionRepository/TypeQuestionRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateQuestionEntity, EditQuestionEntity, ShowQuestionEntity } from 'app/api/domain/entities/TypeQuestionEntities/TypeQuestionsEntity';
import {
  CREATEQUESTION_ITEM,
  DELETEQUESTION_ITEM
} from 'app/api/urls/urls';



export default class TypeQuestionRepositoryImpl implements TypeQuestionRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  async createTypeQuestion(data: CreateQuestionEntity): Promise<boolean> {
    try {
      const response = await axiosClient.post(CREATEQUESTION_ITEM, data, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
          },
      });

      console.log('Request data:', data); // Agrega este console.log para ver los datos enviados en la solicitud

      if (response.status === 200) {
          console.log(response.data);
          return true;
      } else {
          throw new Error(response.statusText);
      }
  } catch (error) {
      console.error('Error occurred:', error);
      throw new Error(AxiosException(error));
  }
  }

  async deleteTypeQuestion(id: number): Promise<boolean> {
    return await axiosClient.delete(DELETEQUESTION_ITEM(id), {
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