import React from "react"

export const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input {...props} className="outline-none border-b-[1px] px-1 py-1 w-full border-black dark:border-white" />
    )
}
