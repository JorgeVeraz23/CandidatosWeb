import axiosClient from '../httpClient/axiosClient';
import { AxiosException } from 'app/errors/exceptions';
import { CatalogueEntity, FormCatalog, QuestionInspectionFormEntity, CatalogueEntityInspector, CatalogueEntityInspectorEditActive } from 'app/api/domain/entities/CatalogueEntity';
import CatalogueRepository from 'app/api/domain/repositories/CatalogueRepository';
import {
    GETALL_ROLES,
    GETALL_CLIENTS,
    GETALL_INSPECTORS,
    GETALL_FORMS,
    GET_ORDER_INSPECTION_LIST,
    GETFORM_CATALOGS,
    GET_CATALOG_QUESTION_INSPECTION,
    CHANGE_STATUS_INSPECTORS,
    GETINSPECTORS_ACTIVES,
} from 'app/api/urls/urls';


export default class CatalogueRepositoryImpl implements CatalogueRepository {

    private readonly token: string;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    async getRoles(): Promise<CatalogueEntity[]> {
        return await axiosClient.get(GETALL_ROLES, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntity[] = [];
            for (const item of response.data) {
                result.push({
                    value: item.id.toString(),
                    label: item.rolName
                });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async getClients(): Promise<CatalogueEntity[]> {
        return await axiosClient.get(GETALL_CLIENTS, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntity[] = [];
            for (const item of response.data) {
                result.push({ value: item.idClient, label: item.nameClient });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async getInspectors(): Promise<CatalogueEntityInspector[]> {
        return await axiosClient.get(GETALL_INSPECTORS, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntityInspector[] = [];
            for (const item of response.data) {
                console.log(response.data);
                result.push({
                    value: item.value,
                     label: item.text,
                      active: item.active,
                      username: item.username,
                    });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
    
    async getInspectorsActive(): Promise<CatalogueEntity[]> {
        return await axiosClient.get(GETINSPECTORS_ACTIVES, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntity[] = [];
            for (const item of response.data) {
                console.log("Estos son los inspectores activos papu :v",response.data);
                result.push({
                    value: item.value,
                     label: item.text,
                     });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }
   
        
    async getInspectorsEditActive(user: string): Promise<boolean> {
        return await axiosClient.put(
            CHANGE_STATUS_INSPECTORS(user),
            null, // El segundo parámetro es el cuerpo de la solicitud, que es nulo en este caso
            {
                headers: {
                    //'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            }
        ).then(async (response) => {
            if (response.status == 200) {
                console.log("¡El estado se cambió correctamente! :v", response.status);
                return true;
            } else {
                throw new Error(response.statusText);
            }
        }).catch(error => {
            console.log("¡Hay un error! :v", error);
            throw new Error(AxiosException(error));
        });
    }
    
    
    //   async getInspectorsEditActive(user: string): Promise<boolean> {
    //     return await axiosClient.put(CHANGE_STATUS_INSPECTORS(user), {
    //       headers: {
    //         'Authorization': `Bearer ${this.token}`,
    //       },
    //     }).then(async (response) => {
    //       if (response.status == 200) {
    //         console.log(response.status)
    //         return true;
    //       } else {
    //         console.log(response.status)
    //         throw new Error(response.statusText);
    //       }
    //     }).catch(error => {
    //         console.log(console.error)
    //       throw new Error(AxiosException(error));
    //     });
    //   }


    async getForms(): Promise<CatalogueEntity[]> {
        return await axiosClient.get(GETALL_FORMS, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntity[] = [];
            for (const item of response.data) {
                result.push({ value: item.idInspectionForm, label: item.nameES });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async getInspectionOrders(): Promise<CatalogueEntity[]> {
        return await axiosClient.get(GET_ORDER_INSPECTION_LIST, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(async (response) => {
            const result: CatalogueEntity[] = [];
            for (const item of response.data) {
                console.log(response.data)
                result.push({ value: item.value, label: item.text });
            }
            return result;
        }).catch(error => {
            throw new Error(AxiosException(error));
        });
    }

    async getAllFormCatalogs(): Promise<FormCatalog[]> {
        try {
            const response = await axiosClient.get(`${GETFORM_CATALOGS}`, {
                headers: { 'Authorization': `Bearer ${this.token}` },
            });
            if (response.status === 200) {
                const result: FormCatalog[] = [];
                for (const data of response.data) {
                    const catalog: FormCatalog = {
                        idCatalogQuestion: data.idCatalogQuestion,
                        catalogName: data.catalogName,
                        itemCatalogs: []
                    };
                    for (const item of data.itemCatalogs) {
                        const option: CatalogueEntity = {
                            value: item.idCatalogQuestionItem,
                            label: item.itemName
                        };
                        catalog.itemCatalogs.push(option);
                    }
                    result.push(catalog);
                }
                return result;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async getCatalogQuestionInspection(data: QuestionInspectionFormEntity): Promise<CatalogueEntity[]> {
        try {
            const response = await axiosClient.get(GET_CATALOG_QUESTION_INSPECTION, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                params: {
                    idRegistrationFormInspection: data.idRegistrationInspectionForm,
                    typeText: data.typeText
                },
            });

            if (response.status === 200) {
                const result: CatalogueEntity[] = [];
                for (const item of response.data) {
                    result.push({ value: item.value, label: item.text });
                }
                return result;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}