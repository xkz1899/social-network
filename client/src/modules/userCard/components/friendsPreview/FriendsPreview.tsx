import { MdPhotoCamera } from "react-icons/md"

import { useAppSelector } from "../../../../hooks/redux"
import st from "./FriendsPreview.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { RouteName } from "../../../../routes"

const FriendsPreview = () => {
	const { id } = useParams()
	const router = useNavigate()

	const { friendCount, friends } = useAppSelector(
		state => state.userCardReducer
	)

	return (
		<div className={st.wrap}>
			<button
				onClick={() => router("../" + id + RouteName.FRIENDS)}
				className={st.friends_btn}
			>
				Friends {friendCount}
			</button>
			<div className={`${st.friends} ${friendCount > 3 && st.two}`}>
				{friends?.map(friend => (
					<div className={st.friend} key={friend.id}>
						<div className={st.avatar}>
							{friend.user.image ? (
								<img
									src={`${process.env.REACT_APP_API_URL}${friend.user.id}/${friend.user.image}`}
									alt={`${friend.user.name}`}
								/>
							) : (
								<MdPhotoCamera />
							)}
						</div>
						<button
							title={friend.user.name}
							onClick={() => router(RouteName.USER_CARD + friend.user.id)}
							className={st.friend_btn}
						>
							{friend.user.name.slice(0, 11)}
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default FriendsPreview
