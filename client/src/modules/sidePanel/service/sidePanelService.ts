import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { setFriendRequest } from "../reducers/sidePanelReducer"

export const getRequestFriendNotification =
	() => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get(`friend/notification`)
			dispatch(setFriendRequest(response.data))
		} catch (err) {}
	}
