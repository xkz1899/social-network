import { useState } from "react"
import { IoIosClose } from "react-icons/io"
import { MdPhotoCamera } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { RouteName } from "../../../../routes"
import { ICommentPhoto } from "../../models/ICommentPhoto"
import { destroyPhotoComment } from "../../service/userCardService"
import st from "./CommentItem.module.scss"

interface ICommentItem {
	comment: ICommentPhoto
}

const PhotoCommentItem = ({ comment }: ICommentItem) => {
	const router = useNavigate()
	const { id } = useParams()

	const [visibleFullComment, setVisibleFullComment] = useState(false)

	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	return (
		<div className={st.comment__item}>
			<div className={st.comment}>
				<div
					className={`${st.avatar} ${comment.user.image && st.avatar__active}`}
				>
					{comment.user.image ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${comment.user.id}/${comment.user.image}`}
							alt=""
						/>
					) : (
						<MdPhotoCamera />
					)}
				</div>
				<div className={st.content__block}>
					<p
						className={st.name}
						onClick={() => router(RouteName.USER_CARD + comment.user.id)}
					>
						{comment.user.surname} {comment.user.name}
					</p>
					{!visibleFullComment && comment.message.length > 300 ? (
						<p className={st.message}>
							{comment.message.slice(0, 300)}{" "}
							<span onClick={() => setVisibleFullComment(true)}>
								{!visibleFullComment && "Show more..."}
							</span>
						</p>
					) : (
						<p className={st.message}>{comment.message}</p>
					)}
					<p className={st.update__time}>
						{comment.updatedAt.slice(0, 16).replace(/T/, " ")}
					</p>
				</div>
			</div>
			{Number(id) === currentUser?.id && (
				<button
					title="Delete comment"
					className={st.delete}
					onClick={() => dispatch(destroyPhotoComment(comment.id))}
				>
					<IoIosClose />
				</button>
			)}
		</div>
	)
}

export default PhotoCommentItem
