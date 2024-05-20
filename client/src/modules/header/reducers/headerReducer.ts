import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { HeaderState } from "./type"

const initialState: HeaderState = {
	isVisibleSidePanel: false,
}

const headerReducer = createSlice({
	name: "header",
	initialState,
	reducers: {
		setVisibleSidePanel(state, action: PayloadAction<boolean>) {
			state.isVisibleSidePanel = action.payload
		},
	},
})

export default headerReducer.reducer
export const { setVisibleSidePanel } = headerReducer.actions
