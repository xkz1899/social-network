import { useEffect } from "react"
import { BiMessageRounded } from "react-icons/bi"
import { FaRegCircleUser } from "react-icons/fa6"
import { HiOutlineUsers } from "react-icons/hi2"
import { IoNewspaperOutline } from "react-icons/io5"
import { MdOutlineSettings } from "react-icons/md"
import { TbPhotoSquareRounded } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./SidePage.module.scss"
import { getRequestFriendNotification } from "./service/sidePanelService"

const SidePanel = () => {
	const router = useNavigate()

	const { currentUser, isAuth } = useAppSelector(state => state.authReducer)
	const { isVisibleSidePanel } = useAppSelector(state => state.headerReducer)
	const { friendRequest } = useAppSelector(state => state.sidePanelReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getRequestFriendNotification())
	}, [window.location.href])

	return (
		<>
			{isAuth && (
				<div className={`${st.wrap} ${isVisibleSidePanel && st.active}`}>
					<button onClick={() => router(RouteName.USER_CARD + currentUser?.id)}>
						<FaRegCircleUser />
						<span>My profile</span>
					</button>
					<button onClick={() => router(RouteName.NEWS)}>
						<IoNewspaperOutline />
						<span>News</span>
					</button>
					<button onClick={() => router(RouteName.CHATS)}>
						<BiMessageRounded />
						<span>Messenger</span>
					</button>
					<button onClick={() => router(currentUser?.id + RouteName.FRIENDS)}>
						<HiOutlineUsers />
						<div className={st.friend}>
							<span>Friends </span>
							{friendRequest > 0 && (
								<span className={st.count}>
									{friendRequest < 10 && friendRequest}
									{friendRequest >= 10 && "9+"}
								</span>
							)}
						</div>
					</button>
					<button onClick={() => router(currentUser?.id + RouteName.PHOTO)}>
						<TbPhotoSquareRounded />
						<span>Photos</span>
					</button>
					<button onClick={() => router(RouteName.SETTINGS)}>
						<MdOutlineSettings />
						<span>Settings</span>
					</button>
				</div>
			)}
		</>
	)
}

export default SidePanel
