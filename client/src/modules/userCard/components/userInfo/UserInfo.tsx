import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useAppSelector } from "../../../../hooks/redux"
import { RouteName } from "../../../../routes"
import { getAge } from "../../../../utils/getAge"
import InfoItem from "../infoItem/InfoItem"
import st from "./UserInfo.module.scss"

const UserInfo = () => {
	const { id } = useParams()
	const router = useNavigate()

	const { user } = useAppSelector(state => state.userCardReducer)
	const { currentUser } = useAppSelector(state => state.authReducer)

	const [isVisible, setVisible] = useState(false)
	return (
		<div className={st.wrap}>
			<div className={st.top}>
				<h5 className={st.name}>
					{user?.surname} {user?.name}
				</h5>
				<div className={st.status}>
					<p>{user?.status}</p>
					{Number(id) === currentUser?.id && !user?.status && (
						<button onClick={() => router(RouteName.SETTINGS)}>
							Change status
						</button>
					)}
				</div>
			</div>

			<div className={st.info__items}>
				{user?.date_birth && (
					<InfoItem name="Date of Birth" value={user.date_birth} type="text" />
				)}
				{isVisible && (
					<>
						{user?.date_birth && (
							<InfoItem
								name="Age"
								value={getAge(user!.date_birth).toString()}
								type="text"
							/>
						)}
						{user?.id && (
							<InfoItem
								name="Website"
								value={`${process.env.REACT_APP_API_URL}${user!.id}`}
								type="btn"
								click={() => router(RouteName.USER_CARD + user?.id)}
							/>
						)}

						{user?.login && (
							<InfoItem name="Login" value={"@" + user!.login} type="text" />
						)}

						{user?.place_work && (
							<InfoItem
								name="Place of work"
								value={user.place_work}
								type="text"
							/>
						)}
						{(user?.telegram || user?.phone_number) && (
							<>
								<h3 className={st.contact}>Contact Information:</h3>
								<div className={st.inner}>
									{user?.phone_number && (
										<InfoItem
											name="Phone number"
											value={user.phone_number}
											type="text"
										/>
									)}
									{user?.telegram && (
										<InfoItem
											name="Telegram"
											value={user.telegram}
											type="text"
										/>
									)}
								</div>
							</>
						)}
						{(user?.university || user?.faculty) && (
							<>
								<h3 className={st.education}>Education:</h3>
								<div className={st.inner}>
									{user?.university && (
										<InfoItem
											name="University"
											value={user.university}
											type="text"
										/>
									)}
									{user?.faculty && (
										<InfoItem name="Faculty" value={user.faculty} type="text" />
									)}
								</div>
							</>
						)}
					</>
				)}
			</div>
			<button
				className={st.btn__visible}
				onClick={() => setVisible(!isVisible)}
			>
				{isVisible ? "Hide Details" : "Show detailed information"}
			</button>
		</div>
	)
}

export default UserInfo
