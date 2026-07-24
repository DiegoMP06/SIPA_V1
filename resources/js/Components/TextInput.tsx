import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props }: TextInputProps,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-400 focus:border-rose-500 focus:ring-rose-500 rounded-md shadow-sm placeholder:text-gray-500 text-gray-800 block w-full ' +
                className
            }
            ref={localRef}
        />
    );
});
