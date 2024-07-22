import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_CARGO, CREATE_CARGO, UPDATE_CARGO, DELETE_CARGO, GET_CARGO } from 'app/api/urls/urls';
//Repository
import CargoRepository from 'app/api/domain/repositories/CargoRepository/CargoRepository';
// import ClienteRepository  from 'app/api/domain/repositories/ClienteRepository/ClienteRepository';
//Entity
import { CreateCargoEntity, EditCargoEntity, MostrarCargoEntity } from 'app/api/domain/entities/CargoEntities/CargoEntity';



export default class CargoRepositoryImpl implements CargoRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async getAllCargo(): Promise<MostrarCargoEntity[]> {
    return await axiosClient.get(GETALL_CARGO, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : MostrarCargoEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          idCargo: item.idCargo,
          nombre: item.nombre,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getCargoById(idCargo: number): Promise<EditCargoEntity> {
    return await axiosClient.get(GET_CARGO(idCargo), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : EditCargoEntity = {
        idCargo: response.data.idCargo,
        nombre: response.data.nombre
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async createCargo(data: CreateCargoEntity): Promise<boolean> {
    try {
        const response = await axiosClient.post(CREATE_CARGO, data, {
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


  async deleteCargo(idCargo: number): Promise<boolean> {
  return await axiosClient.delete(DELETE_CARGO(idCargo), {
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

async editCargo(data: EditCargoEntity): Promise<boolean> {
    return await axiosClient.put(UPDATE_CARGO, data, {
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