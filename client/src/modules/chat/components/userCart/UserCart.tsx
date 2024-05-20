import { SetStateAction } from "react"
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { setCurrentChat, setSelectedUser } from "../../reducers/chatReducer"
import { getAllUsers, deleteChat } from "../../service/chatService"
import st from "./UserCart.module.scss"
import { useNavigate } from "react-router-dom"
import { RouteName } from "../../../../routes"
import { MdPhotoCamera } from "react-icons/md"

interface IUserCart {
	setVisible: React.Dispatch<SetStateAction<boolean>>
}

const UserCart = ({ setVisible }: IUserCart) => {
	const router = useNavigate()

	const { selectedUser, currentChat } = useAppSelector(
		state => state.chatReducer
	)
	const dispatch = useAppDispatch()

	const deleteDialogHandler = () => {
		dispatch(deleteChat(currentChat!))
		dispatch(getAllUsers())
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	return (
		<div className={st.wrap}>
			<div className={st.header}>
				<p className={st.title}>User Info</p>
				<button
					className={st.close}
					onClick={() => setVisible(false)}
					title="Close"
				>
					<AiOutlineClose />
				</button>
			</div>
			<div className={st.body}>
				<div className={st.user}>
					{selectedUser?.image ? (
						<img
							className={st.avatar}
							src={`${process.env.REACT_APP_API_URL}${selectedUser.id}/${selectedUser?.image}`}
							alt=""
						/>
					) : (
						<MdPhotoCamera className={st.avatar} />
					)}
					<div
						onClick={() => router(RouteName.USER_CARD + selectedUser?.id)}
						className={st.data}
					>
						<button className={st.name}>
							{selectedUser?.surname + " " + selectedUser?.name}
						</button>
						<p className={st.last_seen}>
							last seen {selectedUser?.last_seen.replace(/T/, " ").slice(0, 16)}
						</p>
					</div>
				</div>
				<button onClick={() => deleteDialogHandler()} className={st.trash}>
					<AiOutlineDelete />
					Delete dialog
				</button>
			</div>
		</div>
	)
}

export default UserCart
