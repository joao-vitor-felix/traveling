import React from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import Link from "next/link";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
}

const ReservationItem = ({
  reservation,
  fetchReservations
}: UserReservationItemProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!");
    }

    toast.success("Reserva cancelada com sucesso!", {
      position: "bottom-center"
    });

    fetchReservations();
  };

  return (
    <div className="flex flex-col p-5 mt-5 border-primaryLighter border-solid border shadow-lg rounded-lg">
      <div className="flex items-center gap-3 pb-5 border-b border-primaryLighter border-solid">
        <Link
          href={`/trips/${trip.id}`}
          className="relative h-[106px] w-[124px]"
        >
          <Image
            src={trip.coverImage}
            fill
            className="rounded-lg object-cover"
            alt={trip.name}
          />
        </Link>

        <div className="flex flex-col">
          <h3 className="text-xl text-primary font-semibold">{trip.name}</h3>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs text-primary underline">{trip.location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primary">
        <h3 className="text-sm font-medium text-primary">Data</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-900">
            {format(new Date(reservation.startDate), "dd/MM/yyyy", {
              locale: ptBR
            })}
          </p>
          {" - "}
          <p className="text-sm text-gray-900">
            {format(new Date(reservation.endDate), "dd/MM/yyyy", {
              locale: ptBR
            })}
          </p>
        </div>

        <h3 className="mt-5 text-sm text-primary font-medium">Hóspedes</h3>
        <p className="text-sm pb-5 text-gray-900">
          {reservation.guests} hóspedes
        </p>

        <h3 className="font-semibold text-primary mt-3 pt-5 border-t border-solid border-primaryLighter">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-1">
          <p className="text-gray-900 text-sm mt-2">Total:</p>
          <p className="text-gray-900 font-medium text-sm">
            R${Number(reservation.totalPaid)}
          </p>
        </div>

        <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ReservationItem;
