import axiosClient from '../../httpClient/axiosClient';
import CatalogQuestionRepository from 'app/api/domain/repositories/CatalogQuestionRepository/CatalogQuestionRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateCatalogQuestionEntity, EditCatalogQuestionEntity, ShowCatalogQuestionEntity } from 'app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity';
import {
    GETALLCATALOG_QUESTION,
    CREATECATALOG_QUESTION,
    DELETECATALOG_QUESTION
} from 'app/api/urls/urls';



export default class CatalogQuestionRepositoryImpl implements CatalogQuestionRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  async getAllCatalogQuestion(): Promise<ShowCatalogQuestionEntity[]> {
    console.log("URL de solicitud:", GETALLCATALOG_QUESTION); // Agregar console.log para ver la URL de la solicitud

    return await axiosClient.get(GETALLCATALOG_QUESTION, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result: ShowCatalogQuestionEntity[] = [];
      for (const item of response.data) {
        result.push({
            idCatalogQuestion: item.idCatalogQuestion,
            catalogName: item.catalogName,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }



  async createCatalogQuestion(data: CreateCatalogQuestionEntity): Promise<boolean> {
    try {
      const response = await axiosClient.post(CREATECATALOG_QUESTION, data, {
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



  async deleteCatalogQuestion(id: number): Promise<boolean> {
    console.log("URL de solicitud:", DELETECATALOG_QUESTION(id)); // Agregar console.log para ver la URL de la solicitud
    console.log("Encabezados de solicitud:", { 'Authorization': `Bearer ${this.token}` }); // Agregar console.log para ver los encabezados de la solicitud
  
    return await axiosClient.delete(DELETECATALOG_QUESTION(id), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
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