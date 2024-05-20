import { MdPhotoCamera } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { RouteName } from "../../../../routes"
import { IFriend } from "../../models/IFriend"
import { confirmFriendship } from "../../service/friendService"
import st from "./FriendItem.module.scss"

interface IFriendItem {
	friend: IFriend
	category: string
}

const FriendItem = ({ friend, category }: IFriendItem) => {
	const { id } = useParams()
	const router = useNavigate()

	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const agreeFriend = () => {
		dispatch(confirmFriendship(friend.id))
	}

	return (
		<div className={st.wrap}>
			<div className={st.item}>
				<div className={st.avatar}>
					{friend.user.image ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${friend?.user.id}/${friend?.user.image}`}
							alt={friend.user.name}
						/>
					) : (
						<MdPhotoCamera />
					)}
				</div>
				<button
					onClick={() => router(RouteName.USER_CARD + friend.user.id)}
					className={st.fullname}
				>
					{friend.user.surname + " " + friend.user.name}
				</button>
			</div>
			{category === "request" && Number(id) === currentUser?.id && (
				<button onClick={agreeFriend} className={st.accept}>
					Accept as friend
				</button>
			)}
		</div>
	)
}

export default FriendItem
