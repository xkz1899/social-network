import React, { useEffect, useState } from "react"
import { IoMdPhotos } from "react-icons/io"
import { MdPhotoCamera } from "react-icons/md"
import { useParams } from "react-router-dom"

import Loader from "../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { validImageType } from "../../utils/validType"
import st from "./Photos.module.scss"
import Pagination from "./components/pagination/Pagination"
import PhotoItem from "./components/photoItem/PhotoItem"
import { setPage } from "./reducers/photoReducer"
import { createPhoto, getPhotos } from "./service/photosService"

const Photos = () => {
	const { id } = useParams()

	const [order, setOrder] = useState("createdAt:DESC")
	const [limit, setLimit] = useState(9)
	const [photo, setPhoto] = useState<FileList | null>(null)
	const [photoUrl, setPhotoUrl] = useState("")
	const [description, setDescription] = useState("")

	const { page, photos, count, isLoadingPhotos } = useAppSelector(
		state => state.photoReducer
	)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setPage(1))
	}, [])

	useEffect(() => {
		dispatch(getPhotos(Number(id), limit, page, order))
	}, [page, id])

	const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validImageType(e.target.files![0].name)) {
			setPhoto(e.target.files)
			e.target.files && setPhotoUrl(URL.createObjectURL(e.target.files[0]))
		}
	}

	const createPhotoHandler = () => {
		if (photo) {
			dispatch(createPhoto(photo[0], description))
			setPhoto(null)
			setPhotoUrl("")
			setDescription("")
		}
	}

	const clearUpload = () => {
		setPhoto(null)
		setPhotoUrl("")
		setDescription("")
	}

	return (
		<div
			className={`${st.wrap} ${
				(isLoadingPhotos || count <= 0) && st.load_active
			}`}
		>
			<h1 className={st.title}>Photos ({count})</h1>
			{currentUser?.id === Number(id) && (
				<div className={st.area__upload}>
					<button title="Upload photo" className={st.upload}>
						<label htmlFor="upload-photo">
							<input
								id="upload-photo"
								className={st.upload__input}
								type="file"
								onChange={changePhoto}
							/>
							<MdPhotoCamera />
							<span>Upload photo</span>
						</label>
					</button>
					{photo && (
						<>
							<img
								src={photoUrl}
								alt={photo[0].name}
								className={st.preview__photo}
							/>
							<input
								type="text"
								className={st.description}
								placeholder="Enter description..."
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
							<div className={st.btns}>
								<button onClick={createPhotoHandler}>Save</button>
								<button onClick={clearUpload}>Cancel</button>
							</div>
						</>
					)}
				</div>
			)}
			<div className={st.photos__area}>
				{!isLoadingPhotos ? (
					count > 0 ? (
						<div className={st.photos}>
							{photos?.map(photo => (
								<PhotoItem key={photo.id} photo={photo} />
							))}
						</div>
					) : (
						<div className={st.empty}>
							<IoMdPhotos />
							<p>Empty</p>
						</div>
					)
				) : (
					<div className={st.load}>
						<Loader />
					</div>
				)}
				{count > limit && <Pagination limit={limit} />}
			</div>
		</div>
	)
}

export default Photos
