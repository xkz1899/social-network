import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { FaComments } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io"
import { MdPhotoCamera } from "react-icons/md"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { reduceNumbers } from "../../../../utils/reduceNumbers"
import { IPost } from "../../models/IPost"
import { destroyPost, like } from "../../service/userCardService"
import CommentItem from "../commentItem/CommentItem"
import CreateComment from "../createComment/CreateComment"
import st from "./PostItem.module.scss"

interface IPostItem {
	post: IPost
}

const PostItem = ({ post }: IPostItem) => {
	const { id } = useParams()

	const [isFullText, setFullText] = useState(false)
	const [isVisibleInputComment, setVisibleInputComment] = useState(false)
	const [isVisibleComment, setVisibleComment] = useState(false)
	const [isVisibleMenu, setVisibleMenu] = useState(false)

	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const deletePostHandler = () => {
		dispatch(destroyPost(post.id))
	}

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
						<p className={st.name}>
							{post.user.surname} {post.user.name}
						</p>
						<p className={st.update__time}>
							{post.updatedAt.slice(0, 16).replace(/T/, " ")}
						</p>
					</div>
				</div>
				{(Number(id) === currentUser?.id ||
					currentUser?.roles.find(f => f.role === "admin")) && (
					<div className={st.context__wrap}>
						<button
							onClick={() => setVisibleMenu(!isVisibleMenu)}
							className={st.context}
						>
							<BsThreeDots />
						</button>
						<div
							onMouseLeave={() => setVisibleMenu(false)}
							className={`${st.context__menu} ${isVisibleMenu && st.active}`}
						>
							<button onClick={deletePostHandler}>Delete post</button>
						</div>
					</div>
				)}
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
				src={`${process.env.REACT_APP_API_URL}${id}/image/${post.image}`}
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
