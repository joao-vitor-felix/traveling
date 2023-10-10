"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Button from "@/components/Button/Button";
import ReservationItem from "./ReservationItem";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";

const TripList = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/user/${(data?.user as { id: string })?.id}/reservations`
      );

      const json = await response.json();
      setReservations(json);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status, fetchReservations, router]);

  return (
    <main className="container mx-auto p-5">
      <h1 className="font-semibold text-primary text-xl">Minhas Viagens</h1>
      {isLoading ? (
        <div className="flex flex-col items-center p-5 gap-2 lg:w-full lg:flex-row lg:flex-wrap lg:gap-8">
          <SkeletonCard trips={10} height={440} />
        </div>
      ) : reservations.length > 0 ? (
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {reservations?.map(reservation => (
            <ReservationItem
              fetchReservations={fetchReservations}
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      ) : (
        reservations.length < 0 && (
          <div className="flex flex-col lg:max-w-[500px]">
            <p className="mt-2 font-medium text-gray-900">
              Você ainda não possui reservas! =(
            </p>

            <Link href="/">
              <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
            </Link>
          </div>
        )
      )}
    </main>
  );
};

export default TripList;
