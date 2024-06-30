import { InputHTMLAttributes } from "react";

type SubmitButtonProps = InputHTMLAttributes<HTMLInputElement> & {
    value: string;
};

export default function SubmitButton({value, ...props} : SubmitButtonProps) {
  return (
    <input
        type="submit"
        value={value}
        className="bg-indigo-700 text-white font-bold py-2 px-4 hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-default disabled:bg-indigo-700"
        {...props}
    />
  )
}

