import { Worker } from "../worker.model"

export interface Cashier {
  id: number,
  plataDeCambio: number,
  estado: Boolean,
  worker: Worker
}

