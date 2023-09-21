import TripItem from "@/components/TripItem/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React from "react";

const fetchTrips = async () => {
  const trips = await prisma.trip.findMany({});
  return trips;
};

const RecommendedTrips = async () => {
  const data = await fetchTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-primary"></div>
        <h2 className="px-4 text-base font-medium text-primary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-primary"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
