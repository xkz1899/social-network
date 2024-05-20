import { IUser } from "../../../models/IUser"

export interface SearchPeopleState {
	users: IUser[]
  count: number
}
