
export type CreateCargoEntity = {
    nombre: string,
}
export type EditCargoEntity = CreateCargoEntity & {
    idCargo: number,
}

export type MostrarCargoEntity = {
    idCargo: number,
    nombre: string,
}