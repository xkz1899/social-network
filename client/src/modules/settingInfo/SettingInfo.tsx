import { useState } from "react"

import { getAge } from "../../utils/getAge"
import { validLength } from "../../utils/valid"
import { formatName } from "./../../utils/formatName"
import { editInfo } from "./service/settingInfoService"
import st from "./SettingInfo.module.scss"

const SettingInfo = () => {
	const [date, setDate] = useState("1999-08-16")
	const [name, setName] = useState("")
	const [surname, setSurname] = useState("")

	const saveInfo = () => {
		if ((validLength(name, 2, 50), validLength(surname, 3, 50))) {
			editInfo(formatName(name), formatName(surname), date)
		}
	}

	return (
		<div className={st.wrap}>
			<h2 className={st.title}>Please enter your first and last name.</h2>
			<input
				type="text"
				className={st.name}
				placeholder="Name..."
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<input
				type="text"
				className={st.surname}
				placeholder="Surname..."
				value={surname}
				onChange={e => setSurname(e.target.value)}
			/>
			<h4 className={st.subtitle}>Date of Birth:</h4>
			<div className={st.age}>
				<input
					type="date"
					className={st.date}
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
				<p>Age: {getAge(date)}</p>
			</div>
			<button onClick={saveInfo} className={st.btn__save}>
				Save
			</button>
		</div>
	)
}

export default SettingInfo
