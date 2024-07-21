import { CreateClientEntity,EditClientEntity, ShowClientEntity} from  "../../entities/ClientEntities/ClientEntity";

export default interface ClienteRepository {
  getAllClients(): Promise<ShowClientEntity[]>;
  getClientById(id: number): Promise<EditClientEntity>;
  createClient(data: CreateClientEntity): Promise<boolean>;
  deleteClient(id: number): Promise<boolean>;
}
