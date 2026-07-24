import { FormEventHandler, FormHTMLAttributes, ReactNode } from "react"

type FormContainerProps = {
    children: ReactNode;
    handleSubmit: FormEventHandler;
}

export default function FormContainer({children, handleSubmit, className = '', ...props} : FormHTMLAttributes<HTMLFormElement> & FormContainerProps) {
    return (
        <form onSubmit={handleSubmit} className={"my-16 max-w-4xl bg-white shadow mx-auto p-6 grid grid-cols-1 gap-4" + className} {...props}>
            {children}
        </form>
    )
}
