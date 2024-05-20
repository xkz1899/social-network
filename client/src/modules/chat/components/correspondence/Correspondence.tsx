import React, { useState } from "react"
import { Message } from "../../models/IResponseUser"
import Delete from "../delete/Delete"
import st from "./Correspondence.module.scss"
import { IoCheckmarkSharp } from "react-icons/io5"
import { IoCheckmarkDoneSharp } from "react-icons/io5"

interface ICorrespondence {
	message: Message
	user: boolean
}

const Correspondence = ({ message, user }: ICorrespondence) => {
	const [deleteVisible, setDeleteVisible] = useState(false)

	const deleteHandler = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
	) => {
		e.preventDefault()
		setDeleteVisible(!deleteVisible)
	}

	return (
		<>
			<p
				onContextMenu={e => deleteHandler(e)}
				onMouseLeave={() => setDeleteVisible(false)}
				className={`${st.message__text} ${user ? st.other : st.user}`}
			>
				{message.unread ? (
					<IoCheckmarkSharp className={st.check_mark} />
				) : (
					<IoCheckmarkDoneSharp className={st.check_mark} />
				)}
				{deleteVisible && <Delete id={message.id} />}
				{message.message} <span>{message.updatedAt.slice(11, 16)}</span>
			</p>
		</>
	)
}

export default Correspondence
