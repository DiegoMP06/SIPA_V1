import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-rose-500 text-gray-900 focus:border-rose-700 '
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400 focus:text-gray-800 focus:border-gray-400 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
