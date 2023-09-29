import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    reservationId: string;
  };
};

export async function DELETE(
  _request: Request,
  { params: { reservationId } }: Params
) {
  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "Missing reservationId"
      }
    };
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId
    }
  });

  return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
