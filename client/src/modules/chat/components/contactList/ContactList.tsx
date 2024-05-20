import { useEffect } from "react"
import { IoChatboxEllipsesSharp } from "react-icons/io5"

import Loader from "../../../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { getAllUsers } from "../../service/chatService"
import ContactItem from "../contactItem/ContactItem"
import st from "./ContactList.module.scss"

const ContactList = () => {
	const { contactsList, selectedUser, isLoadingUsers } = useAppSelector(
		state => state.chatReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])


	return (
		<div className={`${st.wrap} ${selectedUser !== null && st.hide}`}>
			<div className={st.header_wrap}></div>
			<div className={st.content}>
				{!isLoadingUsers ? (
					contactsList.length ? (
						contactsList.map(user => (
							<ContactItem key={user.id} user={user} />
						))
					) : (
						<div className={st.empty}>
							<IoChatboxEllipsesSharp />
							<p>No chat found</p>
						</div>
					)
				) : (
					<div className={st.load}>
						<Loader />
					</div>
				)}
			</div>
		</div>
	)
}

export default ContactList
