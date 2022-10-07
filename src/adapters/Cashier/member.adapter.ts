export const createMemberAdapter = (member: any) => ({
    id: member.id,
    estado: member.estado,
    idDocumento: {
        id: member.idDocumento.id,
        numeroTramite: member.idDocumento.numeroTramite,
        apellidos: member.idDocumento.apellidos,
        nombres: member.idDocumento.nombres,
        sexo: member.idDocumento.sexo,
        numeroDni: member.idDocumento.numeroDni,
        ejemplar: member.idDocumento.ejemplar,
        nacimiento: member.idDocumento.nacimiento,
        fechaEmision: member.idDocumento.fechaEmision,
        inicioFinCuil: member.idDocumento.inicioFinCuil
    }
});

    