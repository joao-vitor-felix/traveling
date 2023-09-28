"use client";

import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/components/Button/Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const searchParams = useSearchParams();

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate")
        })
      });
      const res = await response.json();

      if (res?.error) {
        return router.push("/");
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    fetchTrip();
  }, [params.tripId, searchParams, router]);

  if (!trip) return null;

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = Number(searchParams.get("guests"));

  console.log(typeof startDate);
  console.log(typeof endDate);
  console.log(typeof guests);

  const handleConfirmTrip = async () => {
    const req = await fetch("/api/trips/reservation", {
      body: JSON.stringify({
        tripId: params.tripId,
        userId: (data?.user as { id: string }).id,
        startDate,
        endDate,
        guests,
        totalPaid: totalPrice
      }),
      method: "POST"
    });

    if (!req.ok) {
      return toast.error("Ocorreu um erro ao realizar a reserva!", {
        position: "bottom-center"
      });
    }

    toast.success("Viagem confirmada com sucesso!", {
      position: "bottom-center",
      autoClose: 3000
    });

    setTimeout(() => {
      router.push("/my-trips");
    }, 3500);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primary">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border-primary border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-primary border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              className="rounded-lg object-cover"
              alt={trip.name}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primary font-semibold">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-primary underline">{trip.location}</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-base text-primary mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-1">
          <p className="text-text-gray-900">Total:</p>
          <p className="font-medium text-gray-900">R${totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h3 className="font-semibold text-primary">Data da sua viagem</h3>
        <div className="flex items-center gap-1 mt-1 text-gray-900">
          <p>{format(startDate, "dd/MM/yyyy", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd/MM/yyyy", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5 text-primary">
          Quantidade de hóspedes
        </h3>
        <p className="text-gray-900">{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleConfirmTrip}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default TripConfirmation;