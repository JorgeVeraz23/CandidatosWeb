import axiosClient from '../httpClient/axiosClient';
import PlanningRepository, { PlanificacionFiltroProps } from "../domain/repositories/PlanningRepository";
import { AxiosException } from 'app/errors/exceptions';
import { PlanningEntity, EditPlanningEntity, CreatePlanningEntity } from "../domain/entities/PlanningEntity";
import {
    GETALL_PLANNINGS,
    GET_PLANNING,
    CREATE_PLANNING,
    EDIT_PLANNING,
    DELETE_PLANNING,
    GET_PLANNINGBYFILTER,
} from 'app/api/urls/urls';
import { convertISODateTimeToDate, convertISODateToLocalDate } from 'app/utils/utils';
import { Delete, Get, Post, Put, userInfo } from '../httpClient/methodsClient';
import axios from 'axios';
export default class PlanningRepositoryImpl implements PlanningRepository {
    private readonly token: string;

    constructor() {
        this.token = userInfo;
    }

    
    

    async getByFilter(FechaDesde: Date, FechaHasta: Date): Promise<PlanningEntity[]> {
        try {
            const response = await axiosClient.get(GET_PLANNINGBYFILTER(FechaDesde, FechaHasta), {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                }
            });
            
            // Extraer los datos de la respuesta
            const data = response.data;
            console.log(data);
            // Crear un array de entidades de planificación
            const result: PlanningEntity[] = data.map((item: any) => ({
                idPlanning: item.idPlanning,
                planningDate: item.planningDate,
                code: item.code,
                clientName: item.clientName,
                inspectorName: item.inspectorName,
                observation: item.observation,
            }));
            
            // Devolver el resultado
            console.log(result);
            return result;
        } catch (error) {
            // Capturar errores y lanzar una excepción
            throw new Error(AxiosException(error));
        }
    }

    async getAll(): Promise<PlanningEntity[]> {
        return await Get<any>(GETALL_PLANNINGS).then(async (data) => {
            const result: PlanningEntity[] = [];
            for (const item of data) {
                result.push({
                    idPlanning: item.idPlanning,
                    planningDate: convertISODateToLocalDate(item.planningDate),
                    code: item.code,
                    clientName: item.clientName,
                    inspectorName: item.inspectorName,
                    observation: item.observation,
                });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
    
    
    async getById(id: string): Promise<EditPlanningEntity> {

        return await Get<any>(`${GET_PLANNING}/${id}`
        ).then(async (data) => {
            const result: EditPlanningEntity = {
                idOrder: data.idOrder,
                inspectionOrder: data.inspectionOrder ?? '',
                idPlanning: data.idPlanning,
                idInspector: data.idInspector,
                planningDate: convertISODateTimeToDate(data.planningDate),
                observation: data.observation
            };
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    

    async create(data: CreatePlanningEntity): Promise<boolean> {
        return await Post<boolean>(CREATE_PLANNING, data).then(async (response) => {
            return response;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async edit(data: EditPlanningEntity): Promise<boolean> {
        return await Put<any>(EDIT_PLANNING, data).then(async (response) => {
            return response;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async delete(id: string): Promise<boolean> {
        return await Delete<any>(`${DELETE_PLANNING}/`, id).then(async (response) => {
            return response;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    

}