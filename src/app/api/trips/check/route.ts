import { prisma } from "@/lib/prisma";
import { isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId
    }
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND"
        }
      })
    );
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
          message:
            "A data de início deve ser maior que a data de início da viagem."
        }
      }),
      {
        status: 400
      }
    );
  }

  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
          message: "A data final deve ser menor que a data final da viagem."
        }
      }),
      {
        status: 400
      }
    );
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.id,
      startDate: {
        lte: new Date(req.endDate)
      },
      endDate: {
        gte: new Date(req.startDate)
      }
    }
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED"
        }
      })
    );
  }

  return new NextResponse(JSON.stringify({ success: true }));
}
