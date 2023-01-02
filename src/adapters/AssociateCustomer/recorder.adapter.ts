export const createRecorderAdapter = (recorder: any) => ({
    id: recorder.id,
    estado: recorder.estado,
    worker: recorder.idTrabajador, 
});
  
  