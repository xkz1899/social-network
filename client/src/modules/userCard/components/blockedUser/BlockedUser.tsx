import React from "react"
import st from "./BlockUser.module.scss"
import { FaUserSecret } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { blockUser } from "../../service/userCardService"

const BlockedUser = () => {
	const { user } = useAppSelector(state => state.userCardReducer)
	const dispatch = useAppDispatch()

	const blockUserHandler = () => {
		if (user) {
			dispatch(blockUser(user.id))
		}
	}
	return (
		<div className={st.wrap}>
			<FaUserSecret />
			<h1>User blocked reason: {user?.ban_message}</h1>
			<button onClick={blockUserHandler} className={st.unlock}>
				Unlock user
			</button>
		</div>
	)
}

export default BlockedUser
