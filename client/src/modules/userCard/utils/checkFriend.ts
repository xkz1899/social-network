import { IFriendCheck } from "../models/IFriendCheck"

export const checkFriendSubscribe = (user: IFriendCheck, id: number) => {
	let result = false
	if (user.agree === false) {
		user.friend_users.forEach(i => {
			if (i.userId === id) {
				if (i.approved) {
					result = false
				}
			} else {
				if (i.approved) {
					result = true
				}
			}
		})
	}
	return result
}
