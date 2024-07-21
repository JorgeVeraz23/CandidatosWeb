import axiosClient from '../../httpClient/axiosClient';
import FormRepository from 'app/api/domain/repositories/FormRepository/FormRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateFormEntity, EditFormEntity, ShowFormEntity } from 'app/api/domain/entities/FormEntities/FormEntity';
import {
  GETALL_FORMS,
  EDIT_FORMS,
  SAVE_FORMS,
  DELETE_FORMS,
  GET_FORMS_BY_ID
} from 'app/api/urls/urls';



export default class FormRepositoryImpl implements FormRepository {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  async getAllForms(): Promise<ShowFormEntity[]> {
    return await axiosClient.get(GETALL_FORMS, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      const result: ShowFormEntity[] = [];
      for (const item of response.data) {
        result.push({
          idInspectionForm: item.idInspectionForm,
          nameES: item.nameES,
          nameEN: item.nameEN,
          description: item.description
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getFormById(id: number): Promise<EditFormEntity> {
    return await axiosClient.get(`${GET_FORMS_BY_ID}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(async (response) => {
      console.log(response.data)
      const result: EditFormEntity = {
        idInspectionForm: response.data.idInspectionForm,
          nameES: response.data.nameES,
          nameEN: response.data.nameEN,
          description: response.data.description
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async createForm(data: CreateFormEntity): Promise<boolean> {
    /*return await axiosClient.post(SAVE_FORMS, data, {
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
    });*/
    try {
      const response = await axiosClient.post(SAVE_FORMS, data, {
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

  async editForm(data: EditFormEntity): Promise<boolean> {
    return await axiosClient.put(EDIT_FORMS, data, {
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

  async deleteForm(id: number): Promise<boolean> {
    return await axiosClient.delete(DELETE_FORMS(id), {
      headers: {
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