import { useEffect, useState } from "react"

import { useAppSelector } from "../../hooks/redux"
import st from "./Setting.module.scss"
import { editProfile } from "./service/settingService"

const Setting = () => {
	const [name, setName] = useState("")
	const [surname, setSurname] = useState("")
	const [dateBirth, setDateBirth] = useState("")
	const [status, setStatus] = useState("")
	const [placeWork, setPlaceWork] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [telegram, setTelegram] = useState("")
	const [university, setUniversity] = useState("")
	const [faculty, setFaculty] = useState("")

	const { currentUser } = useAppSelector(state => state.authReducer)

	useEffect(() => {
		if (currentUser) {
			currentUser.name && setName(currentUser.name)
			currentUser.surname && setSurname(currentUser.surname)
			currentUser.dateBirth && setDateBirth(currentUser.dateBirth)
			currentUser.status && setStatus(currentUser.status)
			currentUser.placeWork && setPlaceWork(currentUser.placeWork)
			currentUser.phoneNumber && setPhoneNumber(currentUser.phoneNumber)
			currentUser.telegram && setTelegram(currentUser.telegram)
			currentUser.university && setUniversity(currentUser.university)
			currentUser.faculty && setFaculty(currentUser.faculty)
		}
	}, [])

	const save = () => {
		editProfile(
			name,
			surname,
			dateBirth,
			status,
			placeWork,
			phoneNumber,
			telegram,
			university,
			faculty
		)
	}

	return (
		<div className={st.wrap}>
			<h1 className={st.title}>Settings</h1>
			<div className={st.main}>
				<div className={st.fullname}>
					<input
						className={st.name}
						type="text"
						placeholder="Name..."
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						className={st.surname}
						type="text"
						placeholder="Surname..."
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
				</div>
				<input
					className={st.date}
					type="date"
					value={dateBirth}
					onChange={e => setDateBirth(e.target.value)}
				/>
			</div>
			<input
				className={st.status}
				type="text"
				placeholder="Status..."
				value={status}
				onChange={e => setStatus(e.target.value)}
			/>
			<input
				className={st.place_work}
				type="text"
				placeholder="Place Work..."
				value={placeWork}
				onChange={e => setPlaceWork(e.target.value)}
			/>
			<div className={st.contact}>
				<h3>Contact Information:</h3>
				<div className={st.inner}>
					<input
						className={st.phone_number}
						type="number"
						placeholder="Phone Number..."
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<input
						className={st.telegram}
						type="text"
						placeholder="Telegram..."
						value={telegram}
						onChange={e => setTelegram(e.target.value)}
					/>
				</div>
			</div>
			<div className={st.education}>
				<h3>Education:</h3>
				<div className={st.inner}>
					<input
						className={st.university}
						type="text"
						placeholder="University..."
						value={university}
						onChange={e => setUniversity(e.target.value)}
					/>
					<input
						className={st.faculty}
						type="text"
						placeholder="Faculty..."
						value={faculty}
						onChange={e => setFaculty(e.target.value)}
					/>
				</div>
			</div>
			<button onClick={save} className={st.save}>
				Save
			</button>
		</div>
	)
}

export default Setting
