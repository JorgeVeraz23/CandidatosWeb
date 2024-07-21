export type PlanningEntity = {
    idPlanning: string,
    planningDate: string,
    code: string,
    clientName: string,
    inspectorName: string,
    observation: string,
}
export type CreatePlanningEntity = {
    idOrder: string,
    idInspector: string,
    planningDate: string,
    observation: string,
}
export type EditPlanningEntity = CreatePlanningEntity & {
    idPlanning: string,
    inspectionOrder: string,
}