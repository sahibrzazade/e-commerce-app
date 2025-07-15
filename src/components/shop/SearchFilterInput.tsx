import { useEffect, useState } from "react";
import { TextInput } from "../TextInput"
import { SearchFilterInputProps } from "../../types";

export const SearchFilterInput = ({ value, onChange }: SearchFilterInputProps) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue !== value) {
                onChange(inputValue);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue]);

    return (
        <div className="flex flex-row">
            <label htmlFor="searchInput" className="mx-2">Search:</label>
            <TextInput
                name={"searchInput"}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
        </div>
    )
}
