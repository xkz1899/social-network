import React from 'react'
import st from "./User.module.scss"
import { MdPhotoCamera } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IPhoto } from '../../models/IPhoto'
import { RouteName } from '../../../../routes'

interface IUserComponent {
  photo: IPhoto
}

const User = ({photo}: IUserComponent) => {
  const router = useNavigate()

  return (
		<div className={st.header}>
			<div className={`${st.avatar} ${photo.user.image && st.avatar__active}`}>
				{photo.user.image ? (
					<img
						src={`${process.env.REACT_APP_API_URL}${photo.user.id}/${photo.user.image}`}
						alt=""
					/>
				) : (
					<MdPhotoCamera />
				)}
			</div>
			<div className={st.user__info}>
				<button
					className={st.name}
					onClick={() => router(RouteName.USER_CARD + photo.userId)}
				>
					{photo.user.surname} {photo.user.name}
				</button>
				<p className={st.update__time}>
					{photo.updatedAt.slice(0, 16).replace(/T/, " ")}
				</p>
			</div>
		</div>
	)
  }
  
export default User
