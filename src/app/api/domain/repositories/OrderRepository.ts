import { CreateInspectionEntity, InspectionOrderEntity, EditInspectionEntity } from "../entities/OrderEntity";

export default interface OrderRepository {
  getAllInspectionOrders(): Promise<InspectionOrderEntity[]>;
  getInspectionOrderById(id: number): Promise<EditInspectionEntity>;
  createInspectionOrder(data: CreateInspectionEntity): Promise<boolean>;
  editInspectionOrder(data: EditInspectionEntity): Promise<boolean>;
  deleteInspectionOrder(id: number): Promise<boolean>;
}