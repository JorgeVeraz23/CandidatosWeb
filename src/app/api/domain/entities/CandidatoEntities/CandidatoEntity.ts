
export type CreateCandidatoEntity = {
    nombreCandidato: string,
    edad: number,
    fotoUrl: string,
    lugarDeNacimiento: string,
    informacionDeContacto: string,
    idPartido: number,
    idCargo: number,
    idTranspariencia: number,
}


export type EditCandidatoEntity = CreateCandidatoEntity & {
    idCandidato: number,
}

export type MostrarCandidatoEntity = {
    idCandidato: number,
    nombreCandidato: string,
    edad: number,
    fotoUrl: string,
    lugarDeNacimiento: string,
    informacionDeContacto: string,
    idPartido: number,
    idCargo: number,
    idTranspariencia: number,
}