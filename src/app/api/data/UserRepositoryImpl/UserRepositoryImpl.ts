import axiosClient from '../../httpClient/axiosClient';
import UserRepository from '../../../api/domain/repositories/userRepository';
import { AxiosException } from 'app/errors/exceptions';
import { LoginUserEntity, ResponseLoginUserEntity } from '../../domain/entities/userEntity';
// import { 
//   GETALL_CLIENTS, 
//   DELETE_CLIENTS,
//   ADD_OR_MODIFY_CLIENT, 
//   GET_CLIENT_BY_ID 
// } from 'app/api/urls/urls';
import { LOGIN_USUARIO } from '../../urls/urls';



export default class UserRepositoryImpl implements  UserRepository{

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }
  




  async LoginUser(userName: string, password: string): Promise<boolean> {
    try {
        const response = await axiosClient.post(LOGIN_USUARIO, { userName, password }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        });

        console.log('Request data:', { userName, password }); // Agrega este console.log para ver los datos enviados en la solicitud

        if (response.status === 200) {
            console.log(response.data);

             // Guarda los datos en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('Rol', response.data.role);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('User', response.data.userName);
            return true;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        throw new Error(AxiosException(error));
    }
}


 

  
}