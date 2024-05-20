import React, { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { blockUser } from "../../service/userCardService"
import st from "./BlockPanel.module.scss"

interface IBlockPanel {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const BlockPanel = ({ setVisible }: IBlockPanel) => {
	const { user } = useAppSelector(state => state.userCardReducer)
	const [message, setMessage] = useState(
		"Violation of the rules for using the site"
	)
	const dispatch = useAppDispatch()

	const blockUserHandler = () => {
		if (user && message.length >= 3) {
			dispatch(blockUser(user.id, true, message))
			setVisible(false)
		}
	}

	return (
		<div className={st.wrap}>
			<h5>
				Block user id: {user?.id} {user?.surname} {user?.name}
			</h5>
			<textarea
				name=""
				id=""
				placeholder="Reason for blocking..."
				value={message}
				onChange={e => setMessage(e.target.value)}
			></textarea>
			<button onClick={blockUserHandler}>Block</button>
		</div>
	)
}

export default BlockPanel
