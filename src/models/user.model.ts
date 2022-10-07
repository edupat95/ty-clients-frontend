import { Club } from "./club.model";

export interface User {
  id_token: string,
  id: number,
  login: string,
  firstName: string,
  lastName: string,
  email: string,
  imageUrl: string,
  activated: boolean,
  langKey: string,
  club: Club
}
