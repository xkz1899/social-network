import { useState } from "react"
import { BiUserCircle } from "react-icons/bi"
import { MdArrowBack, MdPhotoCamera } from "react-icons/md"
import { setSelectedUser, setCurrentChat } from "../../reducers/chatReducer"

import Modal from "../../../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import st from "./HeaderArea.module.scss"
import UserCart from "../userCart/UserCart"

const HeaderArea = () => {
	const { selectedUser } = useAppSelector(state => state.chatReducer)
	const [visibleCart, setVisibleCart] = useState(false)
	const dispatch = useAppDispatch()

	const hideChat = () => {
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	return (
		<div className={st.wrap}>
			<div className={st.wrap__user}>
				<button className={st.btn_back} onClick={() => hideChat()}>
					<MdArrowBack />
				</button>
				<button className={st.user} onClick={() => setVisibleCart(true)}>
					{selectedUser?.image ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${selectedUser.id}/${selectedUser.image}`}
							alt=""
						/>
					) : (
						<MdPhotoCamera  />
					)}
					<div>
						<p className={st.name}>
							{selectedUser?.surname + " " + selectedUser?.name}
						</p>
						<p className={st.last_seen}>
							last seen {selectedUser?.last_seen.replace(/T/, " ").slice(0, 16)}
						</p>
					</div>
				</button>
			</div>

			<Modal visible={visibleCart} setVisible={setVisibleCart}>
				<UserCart setVisible={setVisibleCart} />
			</Modal>
		</div>
	)
}

export default HeaderArea
