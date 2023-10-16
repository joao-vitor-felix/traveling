"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import TripItem from "@/components/TripItem/TripItem";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import Skeleton from "react-loading-skeleton";

const SearchTripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      if (!response.ok) {
        return setIsLoading(false);
      }

      const data = await response.json();
      setTrips(data);
      setIsLoading(false);
    };

    fetchTrips();
  }, [searchParams]);

  return (
    <main className="container mx-auto flex flex-col items-center p-5 gap-2">
      <h1 className="text-primary font-semibold text-xl lg:text-[2.5rem] lg:self-start">
        {isLoading ? <Skeleton count={1} width={300} /> : "Viagens encontradas"}
      </h1>
      <h2 className="text-gray-900 font-medium mb-5 text-center lg:mt-6 lg:self-start">
        {(trips &&
          trips.length > 0 &&
          "Listamos as melhores viagens pra você!") ||
          (isLoading ? (
            <Skeleton count={1} width={300} />
          ) : (
            "Não encontramos viagens nas condições selecionadas! =("
          ))}
      </h2>

      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-8 lg:items-center lg:justify-center">
        {(trips &&
          trips.length > 0 &&
          trips.map(trip => <TripItem key={trip.id} trip={trip} />)) ||
          (isLoading ? <SkeletonCard trips={9} /> : null)}
      </div>
    </main>
  );
};

export default SearchTripList;
