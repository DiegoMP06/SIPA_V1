import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-rose-500 text-rose-800 bg-rose-100 focus:text-rose-900 focus:bg-rose-200 focus:border-rose-700'
                    : 'border-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-400 focus:text-gray-900 focus:bg-gray-100 focus:border-gray-400'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
