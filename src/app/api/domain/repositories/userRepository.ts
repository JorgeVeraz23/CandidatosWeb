// import { CreateInspectionEntity, InspectionOrderEntity, EditInspectionEntity } from "../entities/OrderEntity";
// import { UserEntity, ResponseLoginUserEntity } from "../entities/AuthEntities/UserEntity";
import { ResponseLoginUserEntity, LoginUserEntity } from "../entities/userEntity";
export default interface UserRepository {
  LoginUser(userName: string, password: string): Promise<boolean>;
}