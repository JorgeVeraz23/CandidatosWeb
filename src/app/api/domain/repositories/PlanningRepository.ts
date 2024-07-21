import { 
    CreatePlanningEntity, 
    PlanningEntity, 
    EditPlanningEntity 
} from "../entities/PlanningEntity";

export default interface PlanningRepository {
  getAll(): Promise<PlanningEntity[]>;
  getByFilter(FechaDesde: Date, FechaHasta: Date): Promise<PlanningEntity[]>; 
  getById(id: string): Promise<EditPlanningEntity>;
  create(data: CreatePlanningEntity): Promise<boolean>;
  edit(data: EditPlanningEntity): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface PlanificacionFiltroProps {
  FechaDesde?: string;
  FechaHasta?: string;
}