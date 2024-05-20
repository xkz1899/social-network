import { $authHost } from "../../../http"

export const editProfile = async (
	name: string | null,
	surname: string | null,
	dateBirth: string | null,
	status: string | null,
	placeWork: string | null,
	phoneNumber: string | null,
	telegram: string | null,
	university: string | null,
	faculty: string | null
) => {
	try {
		const formData = new FormData()
		name && formData.append("name", name)
		surname && surname.length && formData.append("surname", surname)
		dateBirth && dateBirth.length && formData.append("dateBirth", dateBirth)
		status && status.length && formData.append("status", status)
		placeWork && placeWork.length && formData.append("placeWork", placeWork)
		phoneNumber &&
			phoneNumber.length &&
			formData.append("phoneNumber", phoneNumber)
		telegram && telegram.length && formData.append("telegram", telegram)
		university && university.length && formData.append("university", university)
		faculty && faculty.length && formData.append("faculty", faculty)

		await $authHost.patch("user/info", formData)
	} catch (err) {}
  finally{
    window.location.reload()
  }
}
