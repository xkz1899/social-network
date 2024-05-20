import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IResponsePeople } from "../models/IResponsePeople"
import { setCount, setUsers } from "../reducers/searchPeopleReducer"

export const searchUsers =
	(fullname: string, limit: number = 20) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponsePeople>(
				`user/search/people?fullname=${fullname}&limit=${limit}`
			)
			dispatch(setUsers(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {}
	}

export const getAllUsers = (limit: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<IResponsePeople>(`user?limit=${limit}`)
		dispatch(setUsers(response.data.rows))
		dispatch(setCount(response.data.count))
	} catch (err) {}
}
