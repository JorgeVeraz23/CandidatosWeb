import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_PROPUESTA, CREAR_PROPUESTA, UPDATE_PROPUESTA, GET_PROPUESTA, DELETE_PROPUESTA } from 'app/api/urls/urls';
//Repository
import PropuestaRepository from 'app/api/domain/repositories/PropuestaRepository/PropuestaRepository';
//Entity
import { CrearPropuestaEntity, EditarPropuestaEntity, MostrarPropuestaEntity } from 'app/api/domain/entities/PropuestasEntities/PropuestaEntity';
import { EditPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';


export default class PropuestaRepositoryImpl implements PropuestaRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllPropuesta(): Promise<MostrarPropuestaEntity[]> {
    return await axiosClient.get(GETALL_PROPUESTA, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : MostrarPropuestaEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
            idPropuesta: item.idPropuesta,
            titulo: item.titulo,
            descripción: item.descripción,
            area: item.area,
            nombreCandidato: item.nombreCandidato,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getPropuestaById(idPropuesta: number): Promise<EditarPropuestaEntity> {
    return await axiosClient.get(GET_PROPUESTA(idPropuesta), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditarPropuestaEntity = {
        idPropuesta: response.data.idPropuesta,
            titulo: response.data.titulo,
            descripción: response.data.descripción,
            area: response.data.area,
            idCandidato: response.data.idCandidato,
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async createPropuesta(data: CrearPropuestaEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREAR_PROPUESTA, data, {
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


  async deletePropuesta(idPropuesta: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_PROPUESTA(idPropuesta), {
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

async editPropuesta(data: EditarPropuestaEntity): Promise<boolean> {
    return await axiosClient.put(UPDATE_PROPUESTA, data, {
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