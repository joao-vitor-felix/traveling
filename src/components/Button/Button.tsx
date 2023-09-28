import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger";
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-gray-900 text-white hover:bg-gray-700",
    outlined: "bg-transparent border-2 border-primary text-gray-900",
    danger:
      "text-red-500 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white"
  };

  const _className = twMerge(
    variantClasses[variant],
    "w-full appearance-none rounded-lg p-2 text-sm font-medium shadow transition-all",
    className
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
