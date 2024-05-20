import { IFriend } from "../models/IFriend"

export interface IFriendState {
	friends: IFriend[]
	count: number
	isLoading: boolean
}
