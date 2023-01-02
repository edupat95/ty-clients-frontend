export const createMemberClubAdapter = (memberClub: any) => ({
  id: memberClub.id,
  identificador: memberClub.identificador,
  fechaAsociacion: memberClub.fechaAsociacion,
  puntosClub: memberClub.puntosClub,
  estado: memberClub.estado,
  idAsociado: {
      id: memberClub.idAsociado.id,
      estado: memberClub.idAsociado.estado
  },
  club: memberClub.club,
  idRegistrador: memberClub.idRegistrador
});


