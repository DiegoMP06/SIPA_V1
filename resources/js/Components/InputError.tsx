import { HTMLAttributes } from 'react';

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={'bg-red-200 border-l-8 rounded border-red-700 text-red-700 font-bold pl-8 py-2 pr-4 text-sm my-2 uppercase ' + className}>
            {message}
        </p>
    ) : null;
}
