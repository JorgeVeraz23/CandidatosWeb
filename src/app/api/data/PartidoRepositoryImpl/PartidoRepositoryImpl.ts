import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_PARTIDOS, CREATE_PARTIDO, UPDATE_PARTIDO, GET_PARTIDO, DELETE_PARTIDO } from 'app/api/urls/urls';
//Repository
import PartidoRepository from 'app/api/domain/repositories/PartidoRepository/PartidoRepository';
//Entity
import { CreatePartidoEntity, EditPartidoEntity, MostrarPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';


export default class PartidoRepositoryImpl implements PartidoRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllPartido(): Promise<MostrarPartidoEntity[]> {
    return await axiosClient.get(GETALL_PARTIDOS, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : MostrarPartidoEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          idPartido: item.idPartido,
          nombrePartido: item.nombrePartido,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getPartidoById(idPartido: number): Promise<EditPartidoEntity> {
    return await axiosClient.get(GET_PARTIDO(idPartido), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditPartidoEntity = {
        idPartido: response.data.idPartido,
        nombrePartido: response.data.nombrePartido
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async createPartido(data: CreatePartidoEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREATE_PARTIDO, data, {
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


  async deletePartido(idPartido: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_PARTIDO(idPartido), {
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

async editPartido(data: EditPartidoEntity): Promise<boolean> {
    return await axiosClient.put(UPDATE_PARTIDO, data, {
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

  
}