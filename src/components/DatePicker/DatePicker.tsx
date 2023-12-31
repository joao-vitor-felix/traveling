import { twMerge } from "tailwind-merge";
import _DatePicker, {
  ReactDatePickerProps,
  registerLocale
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

interface InputProps extends ReactDatePickerProps {
  error?: boolean;
  errorMessage?: string;
}

function DatePicker({ className, error, errorMessage, ...props }: InputProps) {
  const datePickerClassName = twMerge(
    "w-full rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primary placeholder:text-gray-500 placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary",
    error ? "border-red-500" : "",
    className
  );

  return (
    <div className="flex flex-col w-1/2">
      <_DatePicker
        locale="pt-BR"
        className={datePickerClassName}
        enableTabLoop={false}
        dateFormat="dd/MM/yyyy"
        {...props}
      />
      {error && errorMessage && (
        <span className="text-red-500 mt-1 text-xs">{errorMessage}</span>
      )}
    </div>
  );
}

export default DatePicker;
