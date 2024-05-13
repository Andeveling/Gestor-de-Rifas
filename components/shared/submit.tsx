"use client";
import clsx from "clsx";
import { useFormStatus } from "react-dom";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SubmitButton = ({ children, className, ...rest }: ButtonProps & { className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      {...rest}
      className={clsx("btn btn-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50", className)}
      aria-disabled={pending}
      disabled={pending}
    >
      {children}
    </button>
  );
};
