import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SidePanelState } from "./type"

const initialState: SidePanelState = {
	friendRequest: 0,
}

const sidePanelReducer = createSlice({
	name: "side/panel",
	initialState,
	reducers: {
		setFriendRequest(state, action: PayloadAction<number>) {
			state.friendRequest = action.payload
		},
	},
})

export default sidePanelReducer.reducer
export const { setFriendRequest } = sidePanelReducer.actions
