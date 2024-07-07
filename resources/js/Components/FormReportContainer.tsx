import { FormEventHandler, FormHTMLAttributes, ReactNode } from "react"

type FormReportContainerProps = {
    children: ReactNode;
    handleSubmit: FormEventHandler;
}

export default function FormReportContainer({children, handleSubmit, className = '', ...props} : FormHTMLAttributes<HTMLFormElement> & FormReportContainerProps) {
    return (
        <div className="my-16 px-4 max-w-4xl mx-auto">
            <form className={"bg-white shadow p-6 grid grid-cols-1 gap-6" + className} {...props} onSubmit={handleSubmit}>
                { children }
            </form>
        </div>
    )
}
