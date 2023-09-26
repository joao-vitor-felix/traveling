import { prisma } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";
import { FC } from "react";

const getTripDetails = async (tripId: string) => {
  let trip;
  try {
    trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    });
  } finally {
    await prisma.$disconnect();
  }

  return trip;
};

export async function generateMetadata({
  params
}: {
  params: { tripId: string };
}) {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return {
    title: `${trip.name} | Traveling`,
    description: "Trip Details"
  };
}

const TripDetails: FC<{ params: { tripId: string } }> = async ({ params }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <main className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        locationDescription={trip.locationDescription}
        location={trip.location}
        latitude={trip.latitude}
        longitude={trip.longitude}
      />
    </main>
  );
};

export default TripDetails;
