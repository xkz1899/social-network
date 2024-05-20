import { useState } from "react"
import { FaComments } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io"
import { MdPhotoCamera } from "react-icons/md"

import { useAppDispatch } from "../../../../hooks/redux"
import { reduceNumbers } from "../../../../utils/reduceNumbers"
import { IPost } from "../../models/IPost"
import { like } from "../../service/newsService"
import CommentItem from "../commentItem/CommentItem"
import CreateComment from "../createComment/CreateComment"
import st from "./PostItem.module.scss"
import { useNavigate } from "react-router-dom"
import { RouteName } from "../../../../routes"

interface IPostItem {
	post: IPost
}

const PostItem = ({ post }: IPostItem) => {
	const router = useNavigate()

	const [isFullText, setFullText] = useState(false)
	const [isVisibleInputComment, setVisibleInputComment] = useState(false)
	const [isVisibleComment, setVisibleComment] = useState(false)

	const dispatch = useAppDispatch()

	return (
		<div className={st.post} key={post.id}>
			<div className={st.post__header}>
				<div className={st.user}>
					<div
						className={`${st.avatar} ${post.user.image && st.avatar__active}`}
					>
						{post.user.image ? (
							<img
								src={`${process.env.REACT_APP_API_URL}${post.user.id}/${post.user.image}`}
								alt=""
							/>
						) : (
							<MdPhotoCamera />
						)}
					</div>
					<div className={st.user__info}>
						<button
							onClick={() => router(RouteName.USER_CARD + post.userId)}
							className={st.name}
						>
							{post.user.surname} {post.user.name}
						</button>
						<p className={st.update__time}>
							{post.updatedAt.slice(0, 16).replace(/T/, " ")}
						</p>
					</div>
				</div>
			</div>
			{post.text && post.text.length > 300 ? (
				isFullText ? (
					<p>{post.text}</p>
				) : (
					<>
						<p>
							{post.text.slice(0, 300)}
							<span onClick={() => setFullText(true)} className={st.visible}>
								Show more...
							</span>
						</p>
					</>
				)
			) : (
				<p>{post.text}</p>
			)}
			<img
				className={st.post__image}
				src={`${process.env.REACT_APP_API_URL}${post.userId}/image/${post.image}`}
				alt=""
			/>
			<div className={st.btns}>
				<button className={st.like} onClick={() => dispatch(like(post.id))}>
					<IoIosHeart />
					{post.like > 0 && (
						<span>{post.like && reduceNumbers(post.like)}</span>
					)}
				</button>
				<button
					onClick={() => setVisibleInputComment(true)}
					className={st.comment__btn}
					title="Comments"
				>
					<FaComments />
				</button>
			</div>
			{post.post_comments.length ? (
				<div className={st.comments}>
					{post.post_comments.map((comment, i) =>
						!isVisibleComment ? (
							i < 3 && <CommentItem comment={comment} key={comment.id} />
						) : (
							<CommentItem comment={comment} key={comment.id} />
						)
					)}
				</div>
			) : (
				<></>
			)}
			{post.post_comments.length >= 4 && !isVisibleComment && (
				<button
					onClick={() => setVisibleComment(true)}
					className={st.comments__show}
				>
					Show more comments
				</button>
			)}
			{isVisibleInputComment || post.post_comments.length ? (
				<CreateComment id={post.id} />
			) : (
				<></>
			)}
		</div>
	)
}

export default PostItem
