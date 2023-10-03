"use client";

import Button from "@/components/Button/Button";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: string;
}

const TripSearch = () => {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${
        data.text
      }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`
    );
  };

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
      <h1 className="font-semibold text-xl mb-2 text-center lg:text-[2.5rem] lg:mb-12">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>
      <div className="flex flex-col justify-center items-center gap-3 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:px-6 lg:py-6 lg:min-h-max lg:bg-primary lg:bg-opacity-25 lg:rounded-lg">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text", {
            required: "Por favor, informe onde deseja ir."
          })}
        />
        <div className="flex gap-2 w-full lg:h-[58px]">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data Inicial"
                className="w-full"
                minDate={new Date("2024/12/20")}
                maxDate={new Date("2024/12/30")}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="shadow-md transition ease-linear duration-150 lg:w-1/2 lg:self-start"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;
