import React, { useState } from "react"
import { MdPhotoCamera } from "react-icons/md"

import { validImageType } from "../../../../utils/validType"
import { updateAvatar } from "../../service/userCardService"
import st from "./UploadImage.module.scss"

const UploadImage = () => {
	const [avatar, setAvatar] = useState<FileList | null>(null)
	const [avatarUrl, setAvatarUrl] = useState("")


	const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validImageType(e.target.files![0].name)) {
			setAvatar(e.target.files)
			e.target.files && setAvatarUrl(URL.createObjectURL(e.target.files[0]))
		}
	}

	const createPhotoHandler = () => {
		if (avatar) {
			updateAvatar(avatar[0])
			setAvatar(null)
			setAvatarUrl("")
      // window.location.reload()

		}
	}

	const clearUpload = () => {
		setAvatar(null)
		setAvatarUrl("")
	}

	return (
		<div className={st.wrap}>
			<div className={st.area__upload}>
				<button title="Upload photo" className={st.upload}>
					<label htmlFor="upload-avatar">
						<input
							id="upload-avatar"
							className={st.upload__input}
							type="file"
							onChange={changePhoto}
						/>
						<MdPhotoCamera />
						<span>Upload avatar</span>
					</label>
				</button>
				{avatar && (
					<>
						<img
							src={avatarUrl}
							alt={avatar[0].name}
							className={st.preview__avatar}
						/>
						<div className={st.btns}>
							<button onClick={createPhotoHandler}>Save</button>
							<button onClick={clearUpload}>Cancel</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default UploadImage
