import { useEffect } from "react"

import st from "./App.module.scss"
import AppRouter from "./components/AppRouter"
import Container from "./components/container/Container"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { refresh } from "./modules/authorization"
import Header from "./modules/header/Header"
import { SidePanel } from "./modules/sidePanel"

const App = () => {
	const { isAuth } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem(`accessToken`)) {
			dispatch(refresh())
		}
	}, [])

	return (
		<>
			{isAuth && <Header />}
			<Container>
				<div className={`${isAuth && st.wrap} ${st.active}`}>
					<SidePanel />
					<AppRouter />
				</div>
			</Container>
		</>
	)
}

export default App
