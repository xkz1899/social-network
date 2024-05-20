import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./Friend.module.scss"
import FriendItem from "./components/friendItem/FriendItem"
import {
	getFriends,
	getRequestFriends,
	getSubscriptions,
} from "./service/friendService"
import { RouteName } from "../../routes"
import { reduceNumbers } from "./../../utils/reduceNumbers"

const Friend = () => {
	const { id } = useParams()
	const router = useNavigate()

	const { friends, count, isLoading } = useAppSelector(
		state => state.friendReducer
	)
	const dispatch = useAppDispatch()

	const step = 20
	const [limit, setLimit] = useState(step)
	const [category, setCategory] = useState("friends")

	useEffect(() => {
		if (category === "friends") {
			dispatch(getFriends(Number(id), limit))
		}
		if (category === "subscriptions") {
			dispatch(getSubscriptions(Number(id), limit))
		}
		if (category === "request") {
			dispatch(getRequestFriends(Number(id), limit))
		}
	}, [id, category, limit])

	const getMorePosts = () => {
		setLimit(limit + step)
	}

	return (
		<div className={st.wrap}>
			<h3 className={st.title}>Friends</h3>
			<div className={st.category}>
				<button
					onClick={() => setCategory("friends")}
					className={`${category === "friends" && st.active}`}
				>
					Friends {category === "friends" && "(" + reduceNumbers(count) + ")"}
				</button>
				<button
					onClick={() => setCategory("subscriptions")}
					className={`${category === "subscriptions" && st.active}`}
				>
					Subscriptions{" "}
					{category === "subscriptions" && "(" + reduceNumbers(count) + ")"}
				</button>
				<button
					onClick={() => setCategory("request")}
					className={`${category === "request" && st.active}`}
				>
					Request to friends{" "}
					{category === "request" && "(" + reduceNumbers(count) + ")"}
				</button>
			</div>
			<div
				className={`${st.friends} ${
					(count === 0 || isLoading) && st.empty_active
				}`}
			>
				{count > 0 ? (
					isLoading ? (
						<div className={st.load}>
							<Loader />
						</div>
					) : (
						friends.map(friend => (
							<FriendItem key={friend.id} friend={friend} category={category} />
						))
					)
				) : (
					<div className={st.empty}>
						<p>No friends found, find friends </p>
						<button
							className={st.redirect}
							onClick={() => router(RouteName.SEARCH_PEOPLE)}
						>
							here
						</button>
					</div>
				)}
			</div>
			{count > limit && (
				<button onClick={getMorePosts} className={st.btn_more}>
					Show more
				</button>
			)}
		</div>
	)
}

export default Friend
