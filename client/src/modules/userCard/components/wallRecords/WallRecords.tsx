import { useEffect, useState } from "react"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import PostItem from "../postItem/PostItem"
import { getPosts } from "./../../service/userCardService"
import st from "./WallRecords.module.scss"

const WallRecords = () => {
	const step = 4
	const [limit, setLimit] = useState(step)

	const { posts, postCount } = useAppSelector(state => state.userCardReducer)
	const dispatch = useAppDispatch()

	const { id } = useParams()

	useEffect(() => {
		id && dispatch(getPosts(id, limit))
	}, [limit, id])

	const getMorePosts = () => {
		setLimit(limit + step)
	}

	return (
		<div className={`${st.wrap} ${!posts.length && st.active}`}>
			<div className={st.header}>
				<h5 className={st.title}>
					{posts.length ? "All posts" : "No records"}
				</h5>
			</div>
			{posts.length ? (
				<div className={st.posts}>
					{posts.map((post, i) => (
						<PostItem key={post.id} post={post} />
					))}
					{postCount > limit && (
						<button onClick={getMorePosts} className={st.btn__prevision}>
							Show previous posts
						</button>
					)}
				</div>
			) : (
				<div className={st.content__empty}>
					<div className={st.empty}>
						<HiOutlineClipboardDocumentList />
						<p>There are no posts on the wall yet.</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default WallRecords
