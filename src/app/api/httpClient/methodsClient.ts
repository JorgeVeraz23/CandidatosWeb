import { AxiosError, AxiosResponse } from "axios";
import instance from "./axiosClient";
import { useBaseStorage } from "app/hooks/useBaseStorage";
import { UserEntity } from "../domain/entities/AuthEntities/UserEntity";
const { GetData, SaveData, RemoveData } = useBaseStorage();
export const userInfo = GetData<string>("token");
export const Delete = async <T extends unknown>(
    endpoint: string,
    id: string | number,
    authorized: boolean = true,
    params?: object,
  ): Promise<T> => {
      
      if(authorized){
          instance.interceptors.request.use(config => {
              config.headers.Authorization = `Bearer ${userInfo}`;
              return config;
            });
        }
    return await instance.delete(endpoint + `${id}`, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<any>) => {
        console.log(JSON.stringify(error, null, 3));
      //  ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
    //    setIsLoading(false);
      });
  };

export const Get = async <T extends unknown>(
    endpoint: string,
    authorized: boolean = true,
    params?: object,
  ): Promise<T> => {
    
  //   setIsLoading(true);
    if(authorized){
      instance.interceptors.request.use(config => {
          config.headers.Authorization = `Bearer ${userInfo}`;
          return config;
        });
    }
    return await instance.get(endpoint, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<any>) => {
        console.log(JSON.stringify(error, null, 3));
        // ShowAlertApiError(error);
        throw error;
      })
      // .finally(() => {
      //    setIsLoading(false);
      // });
  };

export const Post = async <T extends unknown>(
    endpoint: string,
    data?: object,
    authorized: boolean = true,
    params?: object,
  ): Promise<T> => {
      
      if(authorized && userInfo){
          instance.interceptors.request.use(config => {
              config.headers.Authorization = `Bearer ${userInfo}`;
              return config;
            });
        }
    return await instance.post(endpoint, data, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<any>) => {
      //  ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
    //    setIsLoading(false);
      });
  };

 export const Put = async <T extends unknown>(
    endpoint: string,
    data?: object,
    authorized: boolean = true,
    params?: object,
  ): Promise<T> => {
      
      
      if(authorized && userInfo){
          instance.interceptors.request.use(config => {
              config.headers.Authorization = `Bearer ${userInfo}`;
              return config;
            });
        }
    return await instance.put(endpoint, data, {params})
      .then(({data}: AxiosResponse<T>) => data)
      .catch((error: AxiosError<any>) => {
        console.log(JSON.stringify(error, null, 3));
      //  ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
    //    setIsLoading(false);
      });
  };
