import { useEffect, useState } from "react"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./NewsRender.module.scss"
import PostItem from "./components/postItem/PostItem"
import { getNews } from "./service/newsService"

const NewsRender = () => {
	const step = 7
	const [limit, setLimit] = useState(step)

	const { posts, count } = useAppSelector(state => state.newsReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getNews(limit))
	}, [limit])

	const getMorePosts = () => {
		setLimit(limit + step)
	}

	return (
		<div className={st.wrap}>
			{posts.length ? (
				<div className={st.posts}>
					{posts.map(post => (
						<PostItem key={post.id} post={post} />
					))}
					{count > limit && (
						<button onClick={getMorePosts} className={st.btn__prevision}>
							Show previous posts
						</button>
					)}
				</div>
			) : (
				<div className={st.content__empty}>
					<div className={st.empty}>
						<HiOutlineClipboardDocumentList />
						<p>No news yet make friends.</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default NewsRender
