export const validLength = (
	value: string,
	minLength: number,
	maxLength: number
) => {
	if (value.length >= minLength && value.length <= maxLength) {
		return true
	} else {
		return false
	}
}
