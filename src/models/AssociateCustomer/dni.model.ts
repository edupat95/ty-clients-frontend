/*ESTRUCTURA DEL OBJETO
{
  "id": 1,
  "numeroTramite": 16574,
  "apellidos": "driver",
  "nombres": "Asistente connect hacking",
  "sexo": "invoice evolve",
  "numeroDni": 79568,
  "ejemplar": "granular Blanco Optimizado",
  "nacimiento": "2022-08-23",
  "fechaEmision": "2022-08-22",
  "inicioFinCuil": 57653,
  "user": null
},
*/
export interface Dni {
    id: number,
    numeroTramite: number,
    nombres: String,
    apellidos: String,
    sexo: String,
    numeroDni: number,
    ejemplar: String,
    nacimiento: Date,
    fechaEmision: Date,
    inicioFinCuil: number
}


    