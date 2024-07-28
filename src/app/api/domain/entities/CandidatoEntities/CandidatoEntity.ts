
export type CreateCandidatoEntity = {
    nombreCandidato: string,
    edad: number,
    fotoUrl: string,
    lugarDeNacimiento: string,
    informacionDeContacto: string,
    idPartido: number,
    idCargo: number,

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
    nombrePartido: string,
    cargo: string,
}

export type PropuestaEntity = {
    idPropuesta: number,
    titulo: string,
    descripción: string,
    area: string,
    idCandidato: number | null,
}


export type MostrarCandidatoConDetalleEntity = {
    idCandidato: number,
    nombreCandidato: string,
    edad: number,
    fotoUrl: string,
    lugarDeNacimiento: string,
    informacionDeContacto: string,
    nombrePartido: string,
    cargo: string,
    propuestas: PropuestaEntity[],
}


export type EditCandidatoConDetalleEntity = MostrarCandidatoConDetalleEntity & {
    idCandidato: number,
}