"use client";

import { FC, useState } from "react";
import { Trip } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { add, addDays, differenceInDays } from "date-fns";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";
import { BeatLoader } from "react-spinners";

type FormData = {
  guests: string;
  startDate: Date;
  endDate: Date;
};

const TripReservation: FC<{ trip: Trip }> = ({ trip }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    setError
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const correctStartDate = add(data.startDate, { hours: -3 });
    const correctEndDate = add(data.endDate, { hours: -3 });

    setIsLoading(true);

    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: JSON.stringify({
        tripId: trip.id,
        startDate: correctStartDate,
        endDate: correctEndDate,
        guests: data.guests
      })
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        message: "Esta data já está reservada."
      });

      return setError("endDate", {
        message: "Esta data já está reservada."
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        message: res.error.message
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        message: res.error.message
      });
    }

    router.push(
      `/trips/${
        trip.id
      }/confirmation?startDate=${correctStartDate.toISOString()}&endDate=${correctEndDate.toISOString()}&guests=${
        data.guests
      }`
    );

    setIsLoading(false);
  };

  const correctStartDate = add(trip.startDate, { hours: 3 });
  const correctEndDate = add(trip.endDate, { hours: 3 });

  return (
    <div className="flex flex-col px-5 py-1 gap-3 lg:min-w-[380px] lg:p-5 lg:border-primaryLighter lg:border lg:rounded-lg lg:shadow-lg">
      <p className="text-xl hidden text-gray-900 mb-4 lg:block">
        <span className="font-semibold text-primary">
          R${trip.pricePerDay.toString()}
        </span>{" "}
        por dia
      </p>
      <div className="flex gap-3">
        <Controller
          name="startDate"
          rules={{
            required: "A data inicial é obrigatória."
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data de Início"
              className="w-full"
              minDate={correctStartDate}
              maxDate={(endDate && addDays(endDate, -1)) ?? correctEndDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: "A data final é obrigatória."
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data de Final"
              className="w-full"
              minDate={(startDate && addDays(startDate, 1)) ?? correctStartDate}
              maxDate={correctEndDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: "O número de hóspedes é obrigatório.",
          max: {
            value: trip.maxGuests,
            message: `O número de hóspedes não pode ser maior que ${trip.maxGuests}.`
          }
        })}
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
        placeholder={`Número de hóspedes (max: ${trip.maxGuests})`}
        type="number"
      />
      <div className="flex justify-between mt-3">
        <span className="font-medium text-sm text-gray-900">Total:</span>
        <span className="font-medium text-sm text-gray-900">
          {startDate && endDate
            ? `R$${
                differenceInDays(endDate, startDate) * Number(trip.pricePerDay)
              }`
            : "R$ 0,00"}
        </span>
      </div>
      <div className="pb-5 border-b border-b-primary w-full lg:border-none lg:pb-0">
        <Button
          className="mt-3 w-full"
          onClick={handleSubmit(onSubmit)}
          spinner={<BeatLoader size={15} color="#fff" />}
          isLoading={isLoading}
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
