export const formatName = (name: string) => {
	return name
		.split(" ")
		.map(item =>
			item
				.split("")
				.map((it, i) => (i === 0 ? it.toUpperCase() : it.toLowerCase()))
				.join("")
		)
		.join(" ")
}
