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
                'border-gray-400 focus:border-rose-500 focus:ring-rose-500 rounded-md shadow-sm placeholder:text-gray-500 text-gray-800 block w-full ' +
                className
            }
        >
            <option value="">-- Seleccione --</option>
            { children }
        </select>
    )
});

