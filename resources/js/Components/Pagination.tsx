import { PaginateProps } from "@/types"
import { Link } from "@inertiajs/react";
import { useMemo } from "react";

type PaginationProps = {
    pagination: PaginateProps;
}

export default function Pagination({pagination} : PaginationProps) {
    const BLACK_LIST = ['pagination.previous', 'pagination.next'];

    const links = useMemo(() => pagination.links.filter(link => !BLACK_LIST.includes(link.label)), [pagination.links]);
    const paginateVisible = useMemo(() => pagination.last_page > 1, [pagination.last_page])
    const firsPage = useMemo(() => pagination.current_page === 1, [pagination.current_page])
    const lastPage = useMemo(() => pagination.current_page === pagination.last_page, [pagination.current_page, pagination.last_page])

    return paginateVisible && (
        <div className="flex justify-between items-center my-16 gap-6 flex-col md:flex-row">
            <p className="text-gray-700 font-bold text-lg">
                Página { pagination.current_page } de { pagination.last_page } ({ pagination.per_page } Registros Por Pagina)
            </p>

            <nav className="flex gap-2">
                { !firsPage && (
                    <>
                        <Link href={pagination.first_page_url} className="bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-8" viewBox="0 0 24 24"><path fill="currentColor" d="m4.836 12l6.207 6.207l1.414-1.414L7.664 12l4.793-4.793l-1.414-1.414zm5.65 0l6.207 6.207l1.414-1.414L13.314 12l4.793-4.793l-1.414-1.414z"/></svg>
                        </Link>

                        <Link href={pagination.prev_page_url ?? ''} className="bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg>
                        </Link>
                    </>
                ) }


                { links.map(link => (
                   <Link key={link.label} href={link.url ?? ''} className="hidden lg:grid bg-indigo-700 size-10 place-content-center text-white font-bold hover:bg-indigo-600 transition-colors">
                        { link.label }
                    </Link>
                )) }

                { !lastPage && (
                    <>
                        <Link href={pagination.next_page_url ?? ''} className="bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg>
                        </Link>

                        <Link href={pagination.last_page_url} className="bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-8" viewBox="0 0 24 24"><path fill="currentColor" d="m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414z"/></svg>
                        </Link>
                    </>
                ) }
            </nav>
        </div>
    )
}
