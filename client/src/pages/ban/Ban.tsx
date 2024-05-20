import { FaUserSecret } from "react-icons/fa"

import { useAppSelector } from "../../hooks/redux"
import st from "./Ban.module.scss"

const Ban = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)

	return (
		<div className={st.ban}>
			<FaUserSecret />
			<h1>User blocked reason: {currentUser?.banMessage}</h1>
		</div>
	)
}

export default Ban
