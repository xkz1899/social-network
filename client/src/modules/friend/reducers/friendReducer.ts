import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFriendState } from "./type"
import { IFriend } from "../models/IFriend"

const initialState: IFriendState = {
	friends: [],
	count: 0,
	isLoading: false,
}

const friendReducer = createSlice({
	name: "friend",
	initialState,
	reducers: {
		setFriends(state, action: PayloadAction<IFriend[]>) {
			state.friends = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		removeFriend(state, action: PayloadAction<number>) {
			state.friends = state.friends.filter(f => f.id !== action.payload)
		},
	},
})

export default friendReducer.reducer
export const { setCount, setFriends, setLoading, removeFriend } =
	friendReducer.actions
