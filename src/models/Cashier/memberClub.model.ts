import { Club } from "../club.model"

export interface MemberClub {
    id: number,
    identificador: string,
    fechaAsociacion: string,
    puntosClub: number,
    estado: boolean,
    idAsociado: {
        id: number,
        estado: boolean
    },
    club: Club    
}
