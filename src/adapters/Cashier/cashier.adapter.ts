export const createCashierAdapter = (cashier: any) => ({
    id: cashier.id,
    plataDeCambio: cashier.plataDeCambio,
    worker: cashier.idTrabajador,
    estado: cashier.estado
    
});
  
  