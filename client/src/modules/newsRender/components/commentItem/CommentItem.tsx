import { useState } from "react"
import { MdPhotoCamera } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import { RouteName } from "../../../../routes"
import { PostComment } from "../../models/IPost"
import st from "./CommentItem.module.scss"

interface ICommentItem {
	comment: PostComment
}

const CommentItem = ({ comment }: ICommentItem) => {
	const router = useNavigate()

	const [visibleFullComment, setVisibleFullComment] = useState(false)

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
		</div>
	)
}

export default CommentItem
