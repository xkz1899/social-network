import React, { useState } from "react"
import { MdPhotoCamera } from "react-icons/md"

import { useAppSelector } from "../../../../hooks/redux"
import { validImageType } from "../../../../utils/validType"
import { createPost } from "../../service/userCardService"
import { useAppDispatch } from "./../../../../hooks/redux"
import st from "./CreatePost.module.scss"

const CreatePost = () => {
	const [image, setImage] = useState<FileList | null>(null)
	const [imageUrl, setImageUrl] = useState("")
	const [value, setValue] = useState("")

	const { user } = useAppSelector(state => state.userCardReducer)
	const dispatch = useAppDispatch()

	const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validImageType(e.target.files![0].name)) {
			setImage(e.target.files)
			e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]))
		}
	}

	const createPostHandler = () => {
		if (image) {
			dispatch(createPost(value, image[0]))
		} else {
			dispatch(createPost(value, null))
		}
		setValue("")
		setImageUrl("")
		setImage(null)
	}

	return (
		<div className={st.wrap}>
			<div className={st.post}>
				<div className={`${st.avatar} ${user?.id && st.avatar__active}`}>
					{user?.image ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${user.id}/${user.image}`}
							alt=""
						/>
					) : (
						<MdPhotoCamera />
					)}
				</div>
				<textarea
					className={st.post__text}
					placeholder="Anything new?"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<button title="Upload image" className={st.upload}>
					<label htmlFor="upload-post-image">
						<input
							id="upload-post-image"
							className={st.upload__input}
							type="file"
							onChange={changeImage}
						/>
						<MdPhotoCamera />
					</label>
				</button>
			</div>
			{(image || value) && (
				<div className={st.preview}>
					{image && <img src={imageUrl} className={st.preview__image} alt="" />}
					<button onClick={createPostHandler} className={st.create}>
						Create post
					</button>
				</div>
			)}
		</div>
	)
}

export default CreatePost
