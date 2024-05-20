import React from "react"
import st from "./InfoItem.module.scss"

interface IInfoItem {
	name: string
	value: string | undefined | null
	type: string
	click?: () => void
}

const InfoItem = ({ name, value, type, click }: IInfoItem) => {
	return (
		<div className={st.item}>
			<p className={st.name}>{name}:</p>
			{type === "text" && <p className={st.value}>{value}</p>}
			{type === "btn" && (
				<button onClick={click} className={st.value__button}>
					{value}
				</button>
			)}
		</div>
	)
}

export default InfoItem
