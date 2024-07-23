
export type CrearPropuestaEntity = {
    titulo: string,
    descripción: string,
    area: string,
    idCandidato: number,
}
export type EditarPropuestaEntity = CrearPropuestaEntity & {
    idPropuesta: number,
}

export type MostrarPropuestaEntity = {
    idPropuesta: number,
    titulo: string,
    descripción: string,
    area: string,
    nombreCandidato: string,
    
}