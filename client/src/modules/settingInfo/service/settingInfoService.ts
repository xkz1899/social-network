import { $authHost } from "../../../http"

export const editInfo = async (
	name: string,
	surname: string,
	dateBirth: string
) => {
	try {
		await $authHost.patch("user/info", { name, surname, dateBirth })
	} catch (err) {
	} finally {
		window.location.reload()
	}
}
