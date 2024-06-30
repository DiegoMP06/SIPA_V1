import { Children, forwardRef, ReactNode, SelectHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
    isFocused?: boolean;
    children: ReactNode;
};

export default forwardRef(function SelectInput(
    {className = '', isFocused = false, children, ...props} : SelectInputProps,
    ref
) {
    const localRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle(ref, () => ({
        focus() {
            localRef.current?.focus();
        }
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm placeholder:text-gray-500 text-gray-700 block w-full ' +
                className
            }
        >
            <option value="">-- Seleccione --</option>
            { children }
        </select>
    )
});

