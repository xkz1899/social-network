import React, { useEffect, useRef, useState } from "react"

import { useDelay } from "../../../../hooks/delay"
import { formatName } from "./../../../../utils/formatName"
import st from "./SearchInput.module.scss"

interface ISearchInput {
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput = ({ setSearch }: ISearchInput) => {
	const [searchValue, setSearchValue] = useState("")
	const input = useRef<HTMLInputElement | null>(null)

	const value = useDelay(searchValue)

	useEffect(() => {
		setSearch(formatName(value))
	}, [value])

	useEffect(() => {
		input.current?.focus()
	}, [])

	return (
		<input
			ref={input}
			className={st.search__input}
			placeholder="@Login or Surname Name"
			type="text"
			value={searchValue}
			onChange={e => setSearchValue(e.target.value)}
		/>
	)
}

export default SearchInput
