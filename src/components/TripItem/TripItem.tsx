import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <div className="flex flex-col">
      <Link href={`/trips/${trip.id}`} className="relative h-[280px] w-[280px]">
        <Image
          src={trip.coverImage}
          className="object-cover rounded-lg shadow-md"
          fill
          alt={`Imagem da viagem ${trip.name}`}
        />
      </Link>

      <h3 className="text-primary font-medium text-md mt-2">{trip.name}</h3>
      <div className="flex items-center gap-1 my-1">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-sm text-gray">{trip.location}</p>
      </div>

      <p className="text-sm text-gray-900">
        <span className="text-primary font-medium mr-1">
          R${trip.pricePerDay.toString()}
        </span>
        por dia
      </p>
    </div>
  );
};

export default TripItem;
