import { TextInput } from "../TextInput"

export const SearchFilterInput = () => {
    return (
        <div>
            <label htmlFor="searchInput" className="mx-2">Search:</label>
            <TextInput name={"searchInput"} />
        </div>
    )
}
