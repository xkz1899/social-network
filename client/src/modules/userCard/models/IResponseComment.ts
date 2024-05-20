import { IComment } from "./IPost"

export interface IResponseComment {
	count: number
	rows: IComment[]
}
