import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
import { GetTypeDocumentsCatalogueEntity } from 'app/api/domain/entities/ClientEntities/GetTypeDocumentsCatalogueEntity';
import GetTypeDocumentsCatalogueRepository  from 'app/api/domain/repositories/ClienteRepository/GetTypeDocumentsCatalogueRepository';
import { GETTYPE_DOCUMENTS} from 'app/api/urls/urls';


export default class getTypeDocumentsCatalogueImpl implements GetTypeDocumentsCatalogueRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  async getTypeDocumentsCatalogueRepository(): Promise<GetTypeDocumentsCatalogueEntity[]> {
    return await axiosClient.get(GETTYPE_DOCUMENTS, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result: GetTypeDocumentsCatalogueEntity[] = [];
      for (const item of response.data) {
        result.push({
          value: item.idTypeDocument,
          label: item.text
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  

}