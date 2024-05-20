import { useState } from "react"
import { BiSolidSend } from "react-icons/bi"
import { MdPhotoCamera } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { createPhotoComment } from "../../service/photosService"
import st from "./CreateComment.module.scss"

interface ICreateComment {
	id: number
}

const CreateComment = ({ id }: ICreateComment) => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const [value, setValue] = useState("")

	const createComment = () => {
		if (value.length >= 3) {
			dispatch(createPhotoComment(id, value))
			setValue("")
		}
	}

	return (
		<div className={st.comment__send}>
			<div
				className={`${st.avatar} ${currentUser?.image && st.avatar__active}`}
			>
				{currentUser?.image ? (
					<img
						src={`${process.env.REACT_APP_API_URL}${currentUser.id}/${currentUser.image}`}
						alt={currentUser.surname + " " + currentUser.name}
					/>
				) : (
					<MdPhotoCamera />
				)}
			</div>
			<input
				type="text"
				placeholder="Leave comment..."
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button
				onClick={createComment}
				title="Send comment"
				className={st.btn__send}
			>
				<BiSolidSend />
			</button>
		</div>
	)
}

export default CreateComment
