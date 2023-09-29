import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params: { userId } }: Params) {
  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing userId"
      }
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId
    },
    include: {
      trip: true
    }
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
