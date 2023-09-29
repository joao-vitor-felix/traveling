"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import TripItem from "@/components/TripItem/TripItem";

const SearchTripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${
          searchParams.get("text") ?? ""
        }&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
          "budget"
        )}`
      );

      const data = await response.json();

      setTrips(data);
    };

    fetchTrips();
  }, [searchParams]);

  return (
    <div className="container mx-auto flex flex-col items-center p-5 gap-2">
      <h1 className="text-primary font-semibold text-xl">
        Viagens Encontradas
      </h1>
      <h2 className="text-gray-900 font-medium mb-5 text-center">
        {trips.length > 0
          ? "Listamos as melhores viagens pra você!"
          : "Não encontramos viagens nas condições selecionadas! =("}
      </h2>

      <div className="flex flex-col gap-4">
        {trips?.map(trip => <TripItem key={trip.id} trip={trip} />)}
      </div>
    </div>
  );
};

export default SearchTripList;
