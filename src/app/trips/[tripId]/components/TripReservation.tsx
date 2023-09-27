"use client";

import { FC } from "react";
import { Trip } from "@prisma/client";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { addDays, differenceInDays } from "date-fns";

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

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: JSON.stringify({
        tripId: trip.id,
        startDate: data.startDate,
        endDate: data.endDate,
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
  };

  return (
    <div className="flex flex-col px-5 py-1 gap-3">
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
              minDate={trip.startDate}
              maxDate={trip.endDate}
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
              minDate={addDays(startDate, 1) ?? trip.startDate}
              maxDate={trip.endDate}
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
      <div className="pb-5 border-b border-b-primary w-full">
        <Button className="mt-3 w-full" onClick={handleSubmit(onSubmit)}>
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
