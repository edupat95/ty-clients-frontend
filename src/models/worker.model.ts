import { Club } from "./club.model"
import { User } from "./user.model"

export interface Worker {
  id: number,
  estado: boolean,
  user: User,
  club: Club
}

