import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { setPage } from "../../reducers/photoReducer"
import st from "./Pagination.module.scss"

interface IPagination {
	limit: number

}

const Pagination = ({limit}: IPagination) => {
	const page: Array<number> = []

	const { page: currentPage, count } = useAppSelector(
		state => state.photoReducer
	)
	const dispatch = useAppDispatch()

	for (let i = 0; i < Math.ceil(count / limit); i++) {
		page.push(i + 1)
	}

	const renderPagination = () => {
		return page.map(i => {
			if (
				i === currentPage - 1 ||
				i === currentPage - 2 ||
				i === currentPage ||
				i === currentPage + 1 ||
				i === currentPage + 2
			) {
				return (
					<button
						key={i}
						onClick={() => dispatch(setPage(i))}
						className={`${st.btn} ${i === currentPage ? st.active : ""}`}
					>
						{i}
					</button>
				)
			}
		})
	}

	return count > 0 ? (
		<div className={st.wrap}>
			{currentPage >= 4 && (
				<>
					<button
						className={st.btn}
						onClick={() => dispatch(setPage(1))}
					>
						1
					</button>
					<p className={st.dot}>...</p>
				</>
			)}
			{renderPagination()}
			{currentPage <= page[page.length - 1] - 3 && (
				<>
					<p className={st.dot}>...</p>
					<button
						onClick={() => dispatch(setPage(page[page.length - 1]))}
						className={st.btn}
					>
						{page[page.length - 1]}
					</button>
				</>
			)}
		</div>
	) : (
		<></>
	)
}

export default Pagination
