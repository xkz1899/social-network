import React, { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FaRegCircleUser } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoExitOutline } from "react-icons/io5"
import { MdPhotoCamera } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import Container from "../../components/container/Container"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./Header.module.scss"
import { setVisibleSidePanel } from "./reducers/headerReducer"
import { logout } from "./service/headerService"

const Header = () => {
	const router = useNavigate()

	const dispatch = useAppDispatch()
	const { currentUser } = useAppSelector(state => state.authReducer)
	const { isVisibleSidePanel } = useAppSelector(state => state.headerReducer)

	const [visibleMenu, setVisibleMenu] = useState(false)

	const leave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		logout()
		setVisibleMenu(false)
		router(RouteName.AUTHORIZATION)
	}

	const myProfile = () => {
		router(RouteName.USER_CARD + currentUser?.id)
		setVisibleMenu(false)
	}
	useEffect(() => {
		 dispatch(setVisibleSidePanel(false))
	}, [window.location.href])

	return (
		<>
			<div className={`${st.header} ${isVisibleSidePanel && st.header_active}`}>
				<Container>
					<div className={st.wrap}>
						<div className={st.logo_block}>
							<button
								onClick={() =>
									dispatch(setVisibleSidePanel(!isVisibleSidePanel))
								}
								className={st.burger}
							>
								<GiHamburgerMenu />
							</button>
							<button
								className={st.logo}
								onClick={() => router(RouteName.NEWS)}
								title="Orange Social Network"
							>
								<img src="/logo.png" alt="logo" />
							</button>
						</div>
						<div className={st.block}>
							<button
								title="Search people"
								className={st.search}
								onClick={() => router(RouteName.SEARCH_PEOPLE)}
							>
								<FaSearch />
							</button>
							<div
								onClick={() => setVisibleMenu(!visibleMenu)}
								className={`${st.avatar} ${
									currentUser?.image && st.avatar__active
								}`}
							>
								{currentUser?.image ? (
									<img
										src={`${process.env.REACT_APP_API_URL}${currentUser.id}/${currentUser.image}`}
										alt=""
									/>
								) : (
									<MdPhotoCamera />
								)}
								<div
									className={`${st.user__menu} ${
										visibleMenu && st.menu__active
									}`}
								>
									<button onClick={myProfile}>
										<FaRegCircleUser />
										<span>My Profile</span>
									</button>
									<button onClick={leave}>
										<IoExitOutline />
										<span>Leave</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</>
	)
}

export default Header
