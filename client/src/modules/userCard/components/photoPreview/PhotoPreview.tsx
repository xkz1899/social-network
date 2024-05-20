import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Modal from "../../../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { RouteName } from "../../../../routes"
import { setCurrentPhoto } from "../../reducers/userCardReducer"
import { getPhotos } from "../../service/userCardService"
import CurrentPhoto from "../currentPhoto/CurrentPhoto"
import st from "./PhotoPreview.module.scss"

const PhotoPreview = () => {
	const { id } = useParams()
	const router = useNavigate()

	const { photos, photoCount, currentPhoto } = useAppSelector(
		state => state.userCardReducer
	)
	const dispatch = useAppDispatch()

	const [isVisiblePhoto, setVisiblePhoto] = useState(false)

	useEffect(() => {
		dispatch(getPhotos(Number(id), 4, 1))
	}, [id])

	return (
		<>
			{photoCount > 0 && (
				<div className={st.wrap}>
					<button
						className={st.link}
						onClick={() => router("../" + id + RouteName.PHOTO)}
					>
						My photos {photoCount}
					</button>
					<div className={st.photos}>
						{photos.map(photo => (
							<button
								onClick={() => {
									setVisiblePhoto(true)
									dispatch(setCurrentPhoto(photo))
								}}
								key={photo.id}
								className={st.photo}
							>
								<img
									className={st.photo}
									src={`${process.env.REACT_APP_API_URL}${photo.user.id}/image/${photo.name}`}
									alt={photo.name}
								/>
							</button>
						))}
					</div>
				</div>
			)}
			<Modal visible={isVisiblePhoto} setVisible={setVisiblePhoto}>
				{currentPhoto && <CurrentPhoto photo={currentPhoto} />}
			</Modal>
		</>
	)
}

export default PhotoPreview
