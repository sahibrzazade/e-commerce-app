import { TextInput } from "../TextInput"
import { SearchFilterInputProps } from "../../types";

export const SearchFilterInput = ({ value, onChange }: SearchFilterInputProps) => {
    return (
        <div>
            <label htmlFor="searchInput" className="mx-2">Search:</label>
            <TextInput name={"searchInput"} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}
