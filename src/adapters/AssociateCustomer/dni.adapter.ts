export const createDniAdapter = (dni: any) => ({
    id: dni.id,
    numeroTramite: dni.numeroTramite,
    nombres: dni.nombres,
    apellidos: dni.apellidos,
    sexo: dni.sexo,
    numeroDni: dni.numeroDni,
    ejemplar: dni.ejemplar,
    nacimiento: dni.nacimiento,
    fechaEmision: dni.fechaEmision,
    inicioFinCuil: dni.inicioFinCuil
});
  
  