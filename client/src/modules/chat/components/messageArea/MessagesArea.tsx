import { useEffect, useRef, useState } from "react"
import { MdSend } from "react-icons/md"
import { io } from "socket.io-client"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { Message } from "../../models/IResponseUser"
import {
	deleteMessage,
	setContactList,
	setLoadingUsers,
	setMessages,
	setSelectedUser,
} from "../../reducers/chatReducer"
import { getMessage } from "../../service/chatService"
import Correspondence from "../correspondence/Correspondence"
import EmptyMessageArea from "../emptyMessageArea/EmptyMessageArea"
import HeaderArea from "../headerArea/HeaderArea"
import InputSendMessage from "../inputSendMessage/InputSendMessage"
import { IResponseUser } from "./../../models/IResponseUser"
import st from "./MessageArea.module.scss"

const MessagesArea = () => {
	const { selectedUser, currentChat, messages, isLoadingMessage } =
		useAppSelector(state => state.chatReducer)
	const dispatch = useAppDispatch()
	const URL = process.env.REACT_APP_API_URL || "http://localhost:5000"
	const socket = io(URL)
	const ref = useRef<HTMLDivElement | null>(null)

	const [currentMessage, setCurrentMessage] = useState("")

	useEffect(() => {
		socket.on("message", async (messages: Message[]) => {
			await dispatch(setMessages(messages))
		})
		socket.on("deletedMessage", (id: number) => {
			dispatch(deleteMessage(id))
		})
	}, [])

	useEffect(() => {
		if (!isLoadingMessage) {
			ref.current?.scrollTo(0, ref.current?.scrollHeight)
		}
	}, [isLoadingMessage])

	useEffect(() => {
		currentChat && dispatch(getMessage(currentChat))
	}, [currentChat])

	const sendMessageHandler = () => {
		if (currentMessage.length > 0) {
			socket.emit("sendMessage", {
				message: currentMessage,
				chatId: currentChat,
				accessToken: localStorage.getItem("accessToken"),
			})
			setCurrentMessage("")
			socket.on("message", async (messages: Message[]) => {
				await dispatch(setMessages(messages))
				await ref.current?.scrollTo(0, ref.current?.scrollHeight)
			})
		}
	}

	return (
		<>
			{selectedUser ? (
				<div
					className={st.wrap_message}
					onKeyUp={e => e.key === "Escape" && dispatch(setSelectedUser(null))}
				>
					<HeaderArea />

					<div className={st.wrap}>
						<div className={st.message} ref={ref}>
							{messages?.map(message =>
								message.userId === selectedUser.id ? (
									<Correspondence
										key={message.id}
										message={message}
										user={true}
									/>
								) : (
									<Correspondence
										key={message.id}
										message={message}
										user={false}
									/>
								)
							)}
						</div>
					</div>
					<div className={st.send_message}>
						<InputSendMessage
							value={currentMessage}
							setValue={setCurrentMessage}
						/>
						<button className={st.send_btn} onClick={sendMessageHandler}>
							<MdSend />
						</button>
					</div>
				</div>
			) : (
				<EmptyMessageArea />
			)}
		</>
	)
}

export default MessagesArea
