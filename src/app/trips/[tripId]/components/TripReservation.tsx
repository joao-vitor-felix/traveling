"use client";

import { FC } from "react";
import { Trip } from "@prisma/client";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";

const TripReservation: FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <div className="flex flex-col px-5 py-1 gap-3">
      <div className="flex gap-3">
        <DatePicker placeholderText="Data Inicial" onChange={() => {}} />
        <DatePicker placeholderText="Data Final" onChange={() => {}} />
      </div>
      <Input placeholder={`Número de hóspedes (max: ${trip.maxGuests})`} />
      <div className="flex justify-between mt-3">
        <span className="font-medium text-sm text-gray-900">Total:</span>
        <span className="font-medium text-sm text-gray-900">R$2500</span>
      </div>
      <div className="pb-10 border-b border-b-primary w-full">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  );
};

export default TripReservation;
