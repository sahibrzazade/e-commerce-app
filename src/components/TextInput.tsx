import React from "react"

export const TextInput = ({ name }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input type="text" name={name} id="searchInput" className="outline-none border-b-[1px] px-1 py-1 border-white" />
    )
}
