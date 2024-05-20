import { useParams } from "react-router-dom"
import CreatePost from "../createPost/CreatePost"

import { useAppSelector } from "../../../../hooks/redux"
import PhotoPreview from "../photoPreview/PhotoPreview"
import UserInfo from "../userInfo/UserInfo"
import WallRecords from "../wallRecords/WallRecords"
import st from "./ContentBlock.module.scss"

const ContentBlock = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const { id } = useParams()

	return (
		<div className={st.wrap}>
			<UserInfo />
			<PhotoPreview />
			{currentUser?.id === Number(id) && <CreatePost />}
			<WallRecords />
		</div>
	)
}

export default ContentBlock
