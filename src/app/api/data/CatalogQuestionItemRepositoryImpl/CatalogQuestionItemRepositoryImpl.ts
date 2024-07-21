import axiosClient from '../../httpClient/axiosClient';
import CatalogQuestionItemRepository  from 'app/api/domain/repositories/CatalogQuestionItemRepository/CatalogQuestionItemRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateCatalogQuestionItemEntity, EditCatalogQuestionItemEntity, ShowCatalogQuestionItemEntity } from 'app/api/domain/entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity';
import { EditDetailCatalogQuestionEntity } from 'app/api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity';
import { 
    DELETEQUESTION_ITEM, 
    GETDETAILITEM_CATALOG,
    GETALLITEMSOF_CATALOG, 
    CREATECATALOGQUESTION_ITEM
} from 'app/api/urls/urls';



export default class CatalogQuestionRepositoryImpl implements CatalogQuestionItemRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  

  async getCatalogQuestionItemById(id: number): Promise<EditCatalogQuestionItemEntity> {
    return await axiosClient.get(GETALLITEMSOF_CATALOG(id), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result : EditCatalogQuestionItemEntity = {
        idCatalogQuestionItem: response.data.idCatalogQuestionItem,
        idCatalogQuestion: response.data.idCatalogQuestion,
        itemName:response.data.itemName,
        description: response.data.description,
        order: response.data.order,
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getDetailCatalogQuestionItemById(id: number): Promise<EditDetailCatalogQuestionEntity > {
    return await axiosClient.get(GETDETAILITEM_CATALOG(id), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result : EditDetailCatalogQuestionEntity  = {
        idCatalogQuestion: response.data.idCatalogQuestion,
        catalogName: response.data.catalogName,
        itemCatalogs:response.data.itemCatalogs,

      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }



  async createCatalogQuestionItem(data: CreateCatalogQuestionItemEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREATECATALOGQUESTION_ITEM, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        });


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


  async deleteCatalogQuestionItem(id: number): Promise<boolean> {
  return await axiosClient.delete(DELETEQUESTION_ITEM(id), {
    headers: {
      'Authorization': `Bearer ${this.token}`,
    },
  }).then(async (response) => {
    if (response.status === 200) {
      return true;
    } else {
      throw new Error(response.statusText);
    }
  }).catch(error => {
    throw new Error(AxiosException(error));
  });
}

  
}