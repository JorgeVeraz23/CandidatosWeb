import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_TRANSPARIENCIA, CREATE_TRANSPARIENCIA, UPDATE_TRANSPARIENCIA, GET_TRANSPARIENCIA, DELETE_TRANSPARIENCIA } from 'app/api/urls/urls';
//Repository
import TransparenciaRepository from 'app/api/domain/repositories/TransparienciaRepository/TransparenciaRepository';
//Entity
import { CrearTransparienciaEntity, EditarTransparienciaEntity, MostrarTransparienciaEntity } from 'app/api/domain/entities/TransparienciaEntities/TransparienciaEntity';


export default class TransparenciaRepositoryImpl implements TransparenciaRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllTransparencia(): Promise<MostrarTransparienciaEntity[]> {
    return await axiosClient.get(GETALL_TRANSPARIENCIA, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : MostrarTransparienciaEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          idTranspariencia: item.idTranspariencia,
          declaracionesDeBienes: item.declaracionesDeBienes,
          involucradoEnEscandalos: item.involucradoEnEscandalos,
          evaluacionesDeEtica: item.evaluacionesDeEtica,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getTransparenciaById(idTransparencia: number): Promise<EditarTransparienciaEntity> {
    return await axiosClient.get(GET_TRANSPARIENCIA(idTransparencia), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditarTransparienciaEntity = {
        idTranspariencia: response.data.idTranspariencia,
        declaracionesDeBienes: response.data.declaracionesDeBienes,
        involucradoEnEscandalos: response.data.involucradoEnEscandalos,
        evaluacionesDeEtica: response.data.evaluacionesDeEtica,
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async createTransparencia(data: CrearTransparienciaEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREATE_TRANSPARIENCIA, data, {
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


  async deleteTransparencia(IdTranspariencia: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_TRANSPARIENCIA(IdTranspariencia), {
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

async editTransparencia(data: EditarTransparienciaEntity): Promise<boolean> {
    return await axiosClient.put(UPDATE_TRANSPARIENCIA, data, {
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