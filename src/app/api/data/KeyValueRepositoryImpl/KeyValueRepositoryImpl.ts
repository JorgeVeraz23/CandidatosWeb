import axiosClient from '../../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
//URL
import { GETALL_CARGO, CREATE_CARGO, UPDATE_CARGO, DELETE_CARGO, GET_CARGO } from 'app/api/urls/urls';
import { KEY_VALUE_CANDIDATO, KEYVALE_PARTIDO, KEYVALUE_CARGO, KEYVALUE_TRANSPARENCIA } from 'app/api/urls/urls';
//Repository
import KeyValueRepository from 'app/api/domain/repositories/KeyValueRepository/KeyValueRepository';
// import ClienteRepository  from 'app/api/domain/repositories/ClienteRepository/ClienteRepository';
//Entity
import { KeyValueEntity } from 'app/api/domain/entities/KeyValueEntities/KeyValueEntity';



export default class KeyValueRepositoryImpl implements KeyValueRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  async KeyValueCandidato(): Promise<KeyValueEntity[]> {
    return await axiosClient.get(KEY_VALUE_CANDIDATO, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : KeyValueEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          value: item.key,
          label: item.value,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async KeyValueCargo(): Promise<KeyValueEntity[]> {
    return await axiosClient.get(KEYVALUE_CARGO, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : KeyValueEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          value: item.key,
          label: item.value,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }


  async KeyValuePartido(): Promise<KeyValueEntity[]> {
    return await axiosClient.get(KEYVALE_PARTIDO, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : KeyValueEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          value: item.key,
          label: item.value,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async KeyValueTransparencia(): Promise<KeyValueEntity[]> {
    return await axiosClient.get(KEYVALUE_TRANSPARENCIA, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result : KeyValueEntity[] = [];
      console.log(response.data)
      for(const item of response.data){
        result.push({
          value: item.key,
          label: item.value,
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  
}