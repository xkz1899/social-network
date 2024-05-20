import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./modules/authorization"
import { chatReducer } from "./modules/chat"
import { friendReducer } from "./modules/friend"
import { headerReducer } from "./modules/header"
import { newsReducer } from "./modules/newsRender"
import { photoReducer } from "./modules/photos"
import { searchPeopleReducer } from "./modules/searchPeople"
import { userCardReducer } from "./modules/userCard"
import { sidePanelReducer } from "./modules/sidePanel"

export const store = configureStore({
	reducer: {
		authReducer,
		userCardReducer,
		photoReducer,
		searchPeopleReducer,
		friendReducer,
		chatReducer,
		headerReducer,
		newsReducer,
		sidePanelReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
