export const createWorkerAdapter = (worker: any) => ({
    id: worker.id,
    estado: worker.estado,
    user: worker.user,
    club: worker.idClub
});
  