import { IUser } from "../../../models/IUser"

export interface IResponsePeople {
	count: number
	rows: IUser[]
}
