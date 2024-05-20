import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { GoTrash } from "react-icons/go"
import { IoMdDownload } from "react-icons/io"
import { MdOutlineCropOriginal } from "react-icons/md"
import { useParams } from "react-router-dom"

import Modal from "../../../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { IPhoto } from "../../models/IPhoto"
import { setCurrentPhoto } from "../../reducers/photoReducer"
import { destroyPhoto, updateAvatar } from "../../service/photosService"
import CurrentPhoto from "../currentPhoto/CurrentPhoto"
import st from "./PhotoItem.module.scss"

interface IPhotoItem {
	photo: IPhoto
}

const PhotoItem = ({ photo }: IPhotoItem) => {
	const { id } = useParams()

	const [isVisible, setVisible] = useState(false)
	const [isVisibleMenu, setVisibleMenu] = useState(false)

	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const deletePhoto = () => {
		if (currentUser?.id === photo.userId) {
			dispatch(destroyPhoto(photo.id))
		}
	}

	const selectPhoto = () => {
		setVisible(true)
		dispatch(setCurrentPhoto(photo))
	}

	const setAvatar = () => {
		updateAvatar(photo.name)
	}

	return (
		<>
			<div
				className={st.wrap}
				onClick={selectPhoto}
				onMouseLeave={() => setVisibleMenu(false)}
			>
				<button className={st.photo}>
					<img
						src={`${process.env.REACT_APP_API_URL}/${id}/image/${photo.name}`}
						alt=""
					/>
				</button>
				<div className={st.wrap__menu}>
					<button
						onClick={e => e.stopPropagation()}
						onMouseEnter={() => setVisibleMenu(true)}
						className={st.menu}
					>
						<BsThreeDots />
					</button>
					<div
						onClick={e => e.stopPropagation()}
						onMouseLeave={() => setVisibleMenu(false)}
						className={`${st.menu__group} ${isVisibleMenu && st.active}`}
					>
						{Number(id) === currentUser?.id && (
							<button className={st.set} onClick={setAvatar}>
								<MdOutlineCropOriginal />
								<span>Set as page image</span>
							</button>
						)}
						<a
							className={st.open}
							href={`${process.env.REACT_APP_API_URL}/${id}/image/${photo.name}`}
						>
							<IoMdDownload />
							<span>Open original</span>
						</a>
						{Number(id) === currentUser?.id && (
							<button className={st.delete} onClick={deletePhoto}>
								<GoTrash />
								<span>Delete</span>
							</button>
						)}
					</div>
				</div>
			</div>
			<Modal visible={isVisible} setVisible={setVisible}>
				<CurrentPhoto photo={photo} />
			</Modal>
		</>
	)
}

export default PhotoItem
