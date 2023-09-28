import { prisma } from "@/lib/prisma";
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

  await prisma.tripReservation.create({
    data: {
      tripId: req.tripId,
      userId: req.userId,
      startDate: req.startDate,
      endDate: req.endDate,
      totalPaid: req.totalPaid,
      guests: req.guests
    }
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201
  });
}
