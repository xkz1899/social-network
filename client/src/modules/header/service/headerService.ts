import { $authHost } from "../../../http"

export const logout = async () => {
	try {
		await $authHost.get("/auth/logout")
		localStorage.removeItem("accessToken")
	} catch (err) {
	} finally {
		window.location.reload()
	}
}
