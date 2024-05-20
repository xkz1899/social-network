import { MdPhotoCamera } from "react-icons/md"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { IUserList } from "../../models/IResponseUser"
import { setCurrentChat, setSelectedUser } from "../../reducers/chatReducer"
import st from "./ContactItem.module.scss"

interface IContactItem {
	user: IUserList
}

const ContactItem = ({ user }: IContactItem) => {
	const dispatch = useAppDispatch()
	const { selectedUser } = useAppSelector(state => state.chatReducer)
	const style = [st.item]
	selectedUser?.id === user.userChats[0].user.id && style.push(st.active)

	const selectedUserHandler = () => {
		dispatch(setSelectedUser(user.userChats[0].user))
		dispatch(setCurrentChat(user.userChats[0].chatId))
	}

	return (
		<button onClick={selectedUserHandler} className={style.join(" ")}>
			<div
				className={`${st.avatar} ${
					user.userChats[0].user?.image && st.avatar__active
				}`}
			>
				{user.userChats[0].user?.image ? (
					<img
						src={`${process.env.REACT_APP_API_URL}${user.userChats[0].user.id}/${user.userChats[0].user.image}`}
						alt={
							user.userChats[0].user.surname + " " + user.userChats[0].user.name
						}
					/>
				) : (
					<MdPhotoCamera />
				)}
			</div>
			<div className={st.content}>
				<div className={st.top_block}>
					<p className={st.fullname}>
						{user?.userChats[0].user.surname +
							" " +
							user?.userChats[0].user.name}
					</p>
					<p className={st.last_seen}>
						{user?.messages[0] &&
							user?.messages[0].updatedAt.replace(/T/, " ").slice(11, 16)}
					</p>
				</div>
				<p className={st.message}>
					{user?.messages[0]?.message
						? user?.messages[0]?.message.slice(0, 12)
						: "Here will you message."}
				</p>
			</div>
		</button>
	)
}

export default ContactItem
