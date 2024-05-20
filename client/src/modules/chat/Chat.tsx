import st from "./Chat.module.scss"
import ContactList from "./components/contactList/ContactList"
import MessagesArea from "./components/messageArea/MessagesArea"

const Chat = () => {
	return (
		<div className={st.wrap}>
			<ContactList />
			<MessagesArea />
		</div>
	)
}

export default Chat
