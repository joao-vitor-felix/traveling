import { FC } from "react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

const TripHeader: FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full">
        <Image
          src={trip.coverImage}
          alt={`Imagem da viagem ${trip.name}`}
          fill
          className="object-cover rounded-sm shadow-md"
        />
      </div>
      <div className="flex flex-col p-5 gap-1">
        <h1 className="text-xl font-semibold text-primary">{trip.name}</h1>
        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <span className="text-sm text-primary">{trip.location}</span>
        </div>
        <p className="text-sm">
          <span className="text-primary font-semibold mr-1">
            R${trip.pricePerDay.toString()}
          </span>
          por dia
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
