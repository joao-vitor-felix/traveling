import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

function Button({ className, ...props }: ComponentPropsWithoutRef<"button">) {
  const _className = twMerge(
    "w-full appearance-none rounded-lg bg-gray-900 p-2 text-sm font-medium text-white shadow transition-all hover:bg-gray-700",
    className
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
