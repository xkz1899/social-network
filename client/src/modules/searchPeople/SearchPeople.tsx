import { useEffect, useState } from "react"
import { MdOutlineFindInPage, MdPhotoCamera } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./SearchPeople.module.scss"
import SearchInput from "./components/searchInput/SearchInput"
import { getAllUsers, searchUsers } from "./service/searchService"

const SearchPeople = () => {
	const [value, setValue] = useState("")
	const [limit, setLimit] = useState(20)
	const step = 20

	const router = useNavigate()

	const { users, count } = useAppSelector(state => state.searchPeopleReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		value.length > 0 && dispatch(searchUsers(value, limit))
	}, [value])

	useEffect(() => {
		value.length === 0 && dispatch(getAllUsers(limit))
	}, [limit, value])

	const showMore = () => {
		setLimit(limit + step)
	}

	return (
		<div className={st.wrap}>
			<h2 className={st.title}>Find friends</h2>
			<SearchInput setSearch={setValue} />
			<div className={`${st.users} ${(users === undefined || count === 0) && st.users_empty}`}>
				{count > 0 ? (
					users.map(user => (
						<div className={st.user} key={user.id}>
							{!user.image ? (
								<MdPhotoCamera />
							) : (
								<img
									src={`${process.env.REACT_APP_API_URL}${user.id}/${user.image}`}
									alt={user.surname + " " + user.name}
								/>
							)}
							<p
								onClick={() => router(RouteName.USER_CARD + user.id)}
								className={st.fullname}
							>{`${user.surname} ${user.name}`}</p>
						</div>
					))
				) : (
					<div className={st.empty}>
						<MdOutlineFindInPage />
						<span>Users not found</span>
					</div>
				)}
			</div>
			{count > limit && (
				<button onClick={showMore} className={st.previous}>
					Show previous users
				</button>
			)}
		</div>
	)
}

export default SearchPeople
