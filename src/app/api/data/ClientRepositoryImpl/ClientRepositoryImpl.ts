import axiosClient from '../../httpClient/axiosClient';
import ClienteRepository  from 'app/api/domain/repositories/ClienteRepository/ClienteRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateClientEntity, EditClientEntity, ShowClientEntity } from 'app/api/domain/entities/ClientEntities/ClientEntity';
import { 
  GETALL_CLIENTS, 
  DELETE_CLIENTS,
  ADD_OR_MODIFY_CLIENT, 
  GET_CLIENT_BY_ID 
} from 'app/api/urls/urls';



export default class ClientRepositoryImpl implements ClienteRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllClients(): Promise<ShowClientEntity[]> {
    return await axiosClient.get(GETALL_CLIENTS, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : ShowClientEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          idClient: item.idClient,
          nameClient: item.nameClient, 
          typeDocument: item.typeDocument,
          textTypeDocument: item.textTypeDocument,
          dniNumber: item.dniNumber,
          
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getClientById(id: number): Promise<EditClientEntity> {
    return await axiosClient.get(GET_CLIENT_BY_ID(id), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditClientEntity = {
        idClient: response.data.idClient,
        nameClient: response.data.nameClient,
        typeDocument:response.data.typeDocument,
        textTypeDocument: response.data.textTypeDocument,
        dniNumber: response.data.dniNumber,
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  /*async createClient(data: CreateClientEntity): Promise<boolean> {
    return await axiosClient.post(ADD_OR_MODIFY_CLIENT, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      }).then(async (response) => {
        console.log(response.data)
        if(response.status == 200){
          return true;
        } else {
          throw new Error(response.statusText);
        }
      }).catch(error => {
        
        throw new Error(AxiosException(error));
      });
  }*/

  async createClient(data: CreateClientEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(ADD_OR_MODIFY_CLIENT, data, {
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


  async deleteClient(id: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_CLIENTS(id), {
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