export const getAge = (date: string) => {
	if (!date.match(/\d\d\d\d-\d\d-\d\d/)) {
		return false
	}
	const nowDay = new Date().getDate()
	const nowMonth = new Date().getMonth() + 1
	const nowYear = new Date().getFullYear()
	let age = nowYear - Number(date.split("-")[0])
	if (nowMonth < Number(date.split("-")[1])) {
		age -= 1
	}
	if (
		nowMonth === Number(date.split("-")[1]) &&
		nowDay < Number(date.split("-")[2])
	) {
		age -= 1
	}
	return age
}
