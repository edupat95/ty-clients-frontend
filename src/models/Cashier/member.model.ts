export interface Member {
    id: number,
    estado: boolean,
    idDocumento: {
        id: number,
        numeroTramite: number,
        apellidos: string,
        nombres: string,
        sexo: string,
        numeroDni: number,
        ejemplar: string,
        nacimiento: string,
        fechaEmision: string,
        inicioFinCuil: number
    },
}

    