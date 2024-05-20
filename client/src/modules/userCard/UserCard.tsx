import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./UserCurd.module.scss"
import BlockedUser from "./components/blockedUser/BlockedUser"
import ContentBlock from "./components/contentBlock/ContentBlock"
import ImageBlock from "./components/imageBlock/ImageBlock"
import { getUser } from "./service/userCardService"

const UserCard = () => {
	const { id } = useParams()

	const { user } = useAppSelector(state => state.userCardReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		id && dispatch(getUser(Number(id)))
	}, [id])
	
	return (
		<div className={`${!user?.ban ? st.wrap : ""}`}>
			{!user?.ban ? (
				<>
					<ImageBlock />
					<div className={st.info}>
						<ContentBlock />
					</div>
				</>
			) : (
				<BlockedUser />
			)}
		</div>
	)
}

export default UserCard
