import { FC } from "react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

const TripHeader: FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full lg:hidden">
        <Image
          src={trip.coverImage}
          alt={`Imagem da viagem ${trip.name}`}
          fill
          className="object-cover rounded-sm shadow-md"
        />
      </div>
      <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2">
        <div className="relative row-span-2">
          <Image
            src={trip.coverImage}
            fill
            alt={`Imagem da viagem ${trip.name}`}
            className="object-cover rounded-tl-lg rounded-bl-lg shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[0]}
            fill
            alt={`Imagem da viagem ${trip.name}`}
            className="object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[1]}
            fill
            alt={`Imagem da viagem ${trip.name}`}
            className="object-cover shadow-md  rounded-tr-lg"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[2]}
            fill
            alt={`Imagem da viagem ${trip.name}`}
            className="object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.coverImage}
            fill
            alt={`Imagem da viagem ${trip.name}`}
            className="object-cover shadow-md  rounded-br-lg"
          />
        </div>
      </div>

      <div className="flex flex-col p-5 gap-1 lg:order-1 lg:p-0 lg:mb-10">
        <h1 className="text-xl font-semibold text-primary lg:text3xl">
          {trip.name}
        </h1>
        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <span className="text-sm text-primary lg:text-base">
            {trip.location}
          </span>
        </div>
        <p className="text-sm lg:hidden">
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
