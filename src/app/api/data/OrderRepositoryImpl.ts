import axiosClient from '../httpClient/axiosClient';
import OrderRepository from 'app/api/domain/repositories/OrderRepository';
import { AxiosException } from 'app/errors/exceptions';
import { CreateInspectionEntity, EditInspectionEntity, InspectionOrderEntity } from 'app/api/domain/entities/OrderEntity';
import {
  GETALL_INSPECTIONS,
  GET_INSPECTION,
  CREATE_INSPECTION,
  EDIT_INSPECTION,
  DELETE_INSPECTION
} from 'app/api/urls/urls';
import { convertISODateTimeToDate, convertISODateToLocalDate } from 'app/utils/utils';
import { Delete, Get, Post, Put, userInfo } from '../httpClient/methodsClient';

export default class OrderRepositoryImpl implements OrderRepository {

  private readonly token: string;

  constructor() {
    this.token = userInfo;
  }

  async getAllInspectionOrders(): Promise<InspectionOrderEntity[]> {
    return await Get<any>(GETALL_INSPECTIONS).then(async (data) => {
      const result: InspectionOrderEntity[] = [];
      for (const item of data) {
        result.push({
          idOrder: item.idOrder,
          code: item.code,
          clientName: item.clientName,
          emissionDate: convertISODateToLocalDate(item.emissionDate),
          expiratedDate: convertISODateToLocalDate(item.expiratedDate),
          isPlanning: item.isPlanning ? 'Sí' : 'No'
        });
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async getInspectionOrderById(id: number): Promise<EditInspectionEntity> {
    return await Get<any>(`${GET_INSPECTION}/${id}`).then(async (data) => {
      const result: EditInspectionEntity = {
        idOrder: data.idOrder,
        idClient: data.idClient,
        emissionDate: convertISODateTimeToDate(data.emissionDate),
        expiratedDate: convertISODateTimeToDate(data.expiratedDate),
      }
      return result;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async createInspectionOrder(data: CreateInspectionEntity): Promise<boolean> {
    return await Post<boolean>(CREATE_INSPECTION, data).then(async (response) => {
      return response;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async editInspectionOrder(data: EditInspectionEntity): Promise<boolean> {
    return await Put<boolean>(EDIT_INSPECTION, data).then(async (response) => {
      return response;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

  async deleteInspectionOrder(id: number): Promise<boolean> {
    return await Delete<boolean>(`${DELETE_INSPECTION}/`, id).then(async (response) => {
      return response;
    }).catch(error => {
      throw new Error(AxiosException(error));
    });
  }

}