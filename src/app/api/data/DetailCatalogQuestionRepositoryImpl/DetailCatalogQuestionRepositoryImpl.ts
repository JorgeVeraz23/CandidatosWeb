import axiosClient from '../../httpClient/axiosClient';
import DetailCatalogQuestionRepository from 'app/api/domain/repositories/DetailCatalogQuestionRepository/DetailCatalogQuestionRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateDetailCatalogQuestionEntity, EditDetailCatalogQuestionEntity, ShowDetailCatalogQuestionEntity } from 'app/api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity';
import {
    GETDETAILCATALOG_QUESTION
} from 'app/api/urls/urls';



export default class DetailCatalogQuestionRepositoryImpl implements DetailCatalogQuestionRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

 

  async getDetailCatalogQuestionById(id: number): Promise<EditDetailCatalogQuestionEntity> {
    return await axiosClient.get(GETDETAILCATALOG_QUESTION(id), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result: EditDetailCatalogQuestionEntity = {
        idCatalogQuestion: response.data.idCatalogQuestion,
        catalogName: response.data.catalogName,
        itemCatalogs: response.data.itemCatalogs  
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


 

}