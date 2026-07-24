import { Link } from "@inertiajs/react"
import { ReactNode } from "react"

type NavigateLinkProps = {
    name: string;
    children: ReactNode;
}

export default function NavigateLink({children, name} : NavigateLinkProps) {
    return (
        <Link href={route(name)} className="px-4 py-2 bg-rose-700 text-white font-bold inline-block rounded-xl hover:bg-rose-600 transition-colors">
            { children }
        </Link>
    )
}
