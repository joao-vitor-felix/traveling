"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Button from "@/components/Button/Button";
import ReservationItem from "./ReservationItem";

const TripList = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = useCallback(() => {
    async () => {
      const response = await fetch(
        `/api/user/${(data?.user as { id: string }).id}/reservations`
      );

      const json = await response.json();

      setReservations(json);
    };
  }, [data]);

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status, fetchReservations, router]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primary text-xl">Minhas Viagens</h1>
      {reservations.length > 0 ? (
        reservations?.map(reservation => (
          <ReservationItem
            fetchReservations={fetchReservations}
            key={reservation.id}
            reservation={reservation}
          />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="mt-2 font-medium text-gray-900">
            Você ainda não possui reservas! =(
          </p>

          <Link href="/">
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TripList;
