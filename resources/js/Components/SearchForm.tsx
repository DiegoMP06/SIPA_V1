import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";
import { Dispatch, FormEventHandler, FormHTMLAttributes } from "react"

type SearchType = {
    search: string;
    page: number;
}

type SearchFormProps = {
    handleSearch: FormEventHandler;
    data: SearchType,
    setData: setDataByObject<SearchType> & setDataByMethod<SearchType> & setDataByKeyValuePair<SearchType> | Dispatch<React.SetStateAction<SearchType>>;
    processing: boolean
    placeholder?: string;
}

export default function SearchForm({data, placeholder = "Buscar [No. Control, No. Ficha]", handleSearch, processing, setData, className = '', ...props} : FormHTMLAttributes<HTMLFormElement> & SearchFormProps) {
    return (
        <form className={`flex ${className}`} onSubmit={handleSearch} {...props}>
            <input
                type="search"
                name="search"
                id="search"
                className="flex-1 block rounded-tl rounded-bl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder={placeholder}
                onChange={(e) => setData({search: e.target.value, page: 1})}
                value={data.search}
            />

            <button type="submit" disabled={processing} className="bg-indigo-700 text-white px-4 py-2 rounded-tr rounded-br hover:bg-indigo-600 transition-colors disabled:opacity-25 disabled:bg-indigo-700 disabled:cursor-default cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
    )
}
