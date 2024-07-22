
export type CreatePartidoEntity = {
    nombrePartido: string,
}
export type EditPartidoEntity = CreatePartidoEntity & {
    idPartido: number,
}

export type MostrarPartidoEntity = {
    idPartido: number,
    nombrePartido: string,
}