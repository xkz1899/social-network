require("dotenv").config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require("path")
const { Server } = require("socket.io")
const http = require("http")

require("./models/models")
const sequelize = require("./db")
const router = require("./routes")
const errorMiddleware = require("./middleware/errorMiddleware")
const messageService = require("./service/messageService")
const tokenService = require("./service/tokenService")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(`/api`, router)
app.use(errorMiddleware)

const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "DELETE"],
	},
})

io.on("connection", socket => {
	socket.on("deleteMessage", async id => {
		const deleteId = await messageService.deleteMessage(id)
		await io.emit("deletedMessage", deleteId)
	})

	socket.on("sendMessage", async ({ message, chatId, accessToken }) => {
		const user = await tokenService.verifyAccessToken(accessToken)
		await messageService.sendMessage(chatId, user.id, message)
		const messages = await messageService.getChat(chatId)
		await io.emit("message", messages)
	})
})

const start = () => {
	try {
		sequelize.authenticate()
		sequelize.sync({ alter: true })
		server.listen(PORT, () =>
			console.log(`Server started and work at ${PORT} port...`)
		)
	} catch (err) {
		console.log(err)
	}
}

start()
