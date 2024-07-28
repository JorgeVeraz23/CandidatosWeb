import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_CANDIDATO, CREATE_CANDIDATO, UPDATE_CANDIDATO, GET_CANDIDATO, DELETE_CANDIDATO, GETCANDIDATO_CONDETALES } from 'app/api/urls/urls';
//Repository
import CandidatoRepository from 'app/api/domain/repositories/CandidatoRepository/CandidatoRepository';
//Entity
import { CreateCandidatoEntity,EditCandidatoConDetalleEntity,EditCandidatoEntity,MostrarCandidatoConDetalleEntity,MostrarCandidatoEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';



export default class CandidatoRepositoryImpl implements CandidatoRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllCandidato(): Promise<MostrarCandidatoEntity[]> {
    return await axiosClient.get(GETALL_CANDIDATO, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : MostrarCandidatoEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          idCandidato: item.idCandidato,
          nombreCandidato: item.nombreCandidato,
          edad: item.edad,
          fotoUrl: item.fotoUrl,
          lugarDeNacimiento: item.lugarDeNacimiento,
          informacionDeContacto: item.informacionDeContacto,
          nombrePartido: item.nombrePartido,
          cargo: item.cargo,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getCandidatoById(idCandidato: number): Promise<EditCandidatoEntity> {
    return await axiosClient.get(GET_CANDIDATO(idCandidato), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditCandidatoEntity = {
        idCandidato: response.data.idCandidato,
        nombreCandidato: response.data.nombreCandidato,
        edad: response.data.edad,
        fotoUrl: response.data.fotoUrl,
        lugarDeNacimiento: response.data.lugarDeNacimiento,
        informacionDeContacto: response.data.informacionDeContacto,
        idPartido: response.data.idPartido,
        idCargo: response.data.idCargo,
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getCandidatoConDetalleById(idCandidato: number): Promise<EditCandidatoConDetalleEntity> {
    return await axiosClient.get(GETCANDIDATO_CONDETALES(idCandidato), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditCandidatoConDetalleEntity = {
        idCandidato: response.data.idCandidato,
        nombreCandidato: response.data.nombreCandidato,
        edad: response.data.edad,
        fotoUrl: response.data.fotoUrl,
        lugarDeNacimiento: response.data.lugarDeNacimiento,
        informacionDeContacto: response.data.informacionDeContacto,
        nombrePartido: response.data.nombrePartido,
        cargo: response.data.cargo,
        propuestas: response.data.propuestas.map((p: any) => ({
          idPropuesta: p.idPropuesta,
          titulo: p.titulo,
          descripción: p.descripción,
          area: p.area,
          idCandidato: p.idCandidato,
      })),
      }

      console.log("aqui", JSON.stringify(result, null, 3))
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async createCandidato(data: CreateCandidatoEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREATE_CANDIDATO, data, {
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


  async deleteCandidato(idCandidato: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_CANDIDATO(idCandidato), {
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

async editCandidato(data: EditCandidatoEntity): Promise<boolean> {
    return await axiosClient.put(UPDATE_CANDIDATO, data, {
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