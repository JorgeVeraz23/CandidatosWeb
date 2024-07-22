
export type CrearTransparienciaEntity = {
    declaracionesDeBienes: string,
    involucradoEnEscandalos: boolean,
    evaluacionesDeEtica: string,
}
export type EditarTransparienciaEntity = CrearTransparienciaEntity & {
    idTranspariencia: number,
}

export type MostrarTransparienciaEntity = {
    idTranspariencia: number,
    declaracionesDeBienes: string,
    involucradoEnEscandalos: boolean,
    evaluacionesDeEtica: string,
}