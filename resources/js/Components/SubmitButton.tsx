import { InputHTMLAttributes } from "react";

export default function SubmitButton({value = "Enviar", className = '', ...props} : InputHTMLAttributes<HTMLInputElement>) { 
    return (
        <input
            type="submit"
            value={value}
            className={"bg-rose-700 text-white font-bold py-2 px-4 hover:bg-rose-600 transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-default disabled:bg-rose-700 " + className}
            {...props}
        />
    )
}

