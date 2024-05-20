import { IPhoto } from "./IPhoto"

export interface IResponsePhotos {
	rows: IPhoto[]
	count: number
}
