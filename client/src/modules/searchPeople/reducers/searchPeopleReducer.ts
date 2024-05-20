import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SearchPeopleState } from "./type"
import { IUser } from "../../../models/IUser"

const initialState: SearchPeopleState = {
	users: [],
	count: 0,
}

const searchPeopleReducer = createSlice({
	name: "search/people",
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<IUser[]>) {
			state.users = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		addCount(state) {
			state.count = state.count + 1
		},
	},
})

export default searchPeopleReducer.reducer
export const { setCount, setUsers } = searchPeopleReducer.actions
