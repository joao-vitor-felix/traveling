import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16"
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET_KEY as string
  );

  if (event.type === "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any;

    await prisma.tripReservation.create({
      data: {
        startDate: new Date(session.metadata.startDate),
        endDate: new Date(session.metadata.endDate),
        userId: session.metadata.userId,
        tripId: session.metadata.tripId,
        totalPaid: Number(session.metadata.totalPrice),
        guests: Number(session.metadata.guests)
      }
    });
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
