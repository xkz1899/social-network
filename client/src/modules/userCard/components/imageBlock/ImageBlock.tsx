import { useEffect, useState } from "react"
import { MdPhotoCamera } from "react-icons/md"
import { Route, useNavigate, useParams } from "react-router-dom"

import Modal from "../../../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import {
	checkChat,
	checkFriend,
	confirmFriend,
	createRequestFriend,
	getFriends,
} from "../../service/userCardService"
import { checkFriendSubscribe } from "../../utils/checkFriend"
import BlockPanel from "../blockPanel/BlockPanel"
import FriendsPreview from "../friendsPreview/FriendsPreview"
import UploadImage from "../uploadImage/UploadImage"
import st from "./ImageBlock.module.scss"
import { RouteName } from "../../../../routes"

const ImageBlock = () => {
	const { id } = useParams()
	const router = useNavigate()

	const [isVisibleUploadMenu, setVisibleUploadMenu] = useState(false)
	const [isVisibleBlockPanel, setVisibleBlockPanel] = useState(false)

	const { user, friend, friendCount } = useAppSelector(
		state => state.userCardReducer
	)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(checkFriend(Number(id)))
		dispatch(getFriends(Number(id)))
	}, [id])

	const createChat = () => {
		router(RouteName.CHATS)
		checkChat(Number(id))
	}

	const renderButtonFriend = () => {
		if (currentUser?.id !== Number(id)) {
			if (
				friend &&
				currentUser &&
				checkFriendSubscribe(friend, currentUser.id)
			) {
				return (
					<button
						onClick={() => {
							dispatch(confirmFriend(friend.friend_users[0].id))
						}}
						className={st.add__friend}
					>
						Accept as friend
					</button>
				)
			} else if (!friend) {
				return (
					<button
						onClick={() => {
							dispatch(createRequestFriend(Number(id)))
						}}
						className={st.add__friend}
					>
						Add to friend
					</button>
				)
			}
		}
	}

	return (
		<div className={st.wrap}>
			<div className={`${st.image} ${user?.image && st.image__active}`}>
				<div className={`${st.avatar} ${user?.image && st.avatar__active}`}>
					{user?.image ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${user.id}/${user.image}`}
							alt={`${user.name} ${user.surname}`}
						/>
					) : (
						<MdPhotoCamera />
					)}
					{!user?.image && <p>Add an image</p>}
				</div>
				{user?.id === currentUser?.id && (
					<button
						onClick={() => setVisibleUploadMenu(true)}
						className={st.edit__image}
					>
						Edit image
					</button>
				)}
			</div>
			<div className={st.buttons}>
				{currentUser?.id !== Number(id) && (
					<button onClick={createChat} className={st.message}>
						Send message{" "}
					</button>
				)}
				{renderButtonFriend()}
				{currentUser?.id !== Number(id) &&
					currentUser?.roles.find(f => f.role === "admin") && (
						<button
							onClick={() => setVisibleBlockPanel(true)}
							className={st.block}
						>
							Block user{" "}
						</button>
					)}
			</div>
			{friendCount > 0 && <FriendsPreview />}
			<Modal setVisible={setVisibleBlockPanel} visible={isVisibleBlockPanel}>
				<BlockPanel setVisible={setVisibleBlockPanel} />
			</Modal>
			<Modal visible={isVisibleUploadMenu} setVisible={setVisibleUploadMenu}>
				<UploadImage />
			</Modal>
		</div>
	)
}

export default ImageBlock
