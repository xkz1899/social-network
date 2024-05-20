import { useEffect, useState } from "react"
import { GoCommentDiscussion } from "react-icons/go"
import { IoIosHeart } from "react-icons/io"

import Loader from "../../../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { reduceNumbers } from "../../../../utils/reduceNumbers"
import { IPhoto } from "../../models/IPhoto"
import { getCommentsPhoto, likePhoto } from "../../service/userCardService"
import CreateCommentPhoto from "../createCommentPhoto/CreateCommentPhoto"
import PhotoCommentItem from "../photoCommentItem/PhotoCommentItem"
import User from "../user/User"
import st from "./CurrentPhoto.module.scss"

interface ICurrentPhoto {
	photo: IPhoto
}

const CurrentPhoto = ({ photo }: ICurrentPhoto) => {
	const [limit, setLimit] = useState(9)
	const [visibleFullDescription, setVisibleFullDescription] = useState(false)

	const { commentsPhoto, commentCountPhoto, currentPhoto } = useAppSelector(
		state => state.userCardReducer
	)
	const { isLoadingComments } = useAppSelector(state => state.photoReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		currentPhoto &&
			currentPhoto?.id === currentPhoto.id &&
			dispatch(getCommentsPhoto(currentPhoto.id, limit))
	}, [currentPhoto, limit])

	return (
		<div className={st.wrap}>
			<div className={st.photo}>
				<img
					src={`${process.env.REACT_APP_API_URL}${photo.userId}/image/${photo.name}`}
					alt=""
				/>
			</div>
			<div className={st.content}>
				<User photo={photo} />
				<div className={st.photo__info}>
					<div className={st.like}>
						<button onClick={() => dispatch(likePhoto(photo.id))}>
							<IoIosHeart />
						</button>
						<span>{photo.like > 0 && reduceNumbers(photo.like)}</span>
					</div>
					{!visibleFullDescription &&
					photo.description &&
					photo.description.length > 300 ? (
						<p className={st.description}>
							{photo.description.slice(0, 300)}{" "}
							<span onClick={() => setVisibleFullDescription(true)}>
								{!visibleFullDescription && "Show more..."}
							</span>
						</p>
					) : (
						<p className={st.description}>{photo.description}</p>
					)}
					<div className={st.comments}>
						{!isLoadingComments ? (
							commentCountPhoto > 0 ? (
								commentsPhoto.map(comment => (
									<PhotoCommentItem key={comment.id} comment={comment} />
								))
							) : (
								<div className={st.empty}>
									<GoCommentDiscussion />
									<p>Be one of the first to comment on this photo</p>
								</div>
							)
						) : (
							<Loader />
						)}
						{commentCountPhoto > commentsPhoto.length + 1 && (
							<button
								className={st.btn__prevision}
								onClick={() => setLimit(limit + 9)}
							>
								Show previous comments
							</button>
						)}
					</div>
				</div>
				<CreateCommentPhoto id={photo.id} />
			</div>
		</div>
	)
}

export default CurrentPhoto
