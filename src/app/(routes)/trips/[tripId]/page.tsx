import { prisma } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";
import { FC } from "react";

const getTripDetails = async (tripId: string) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    });

    return trip;
  } catch (error) {
    console.error(error);
  }
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
    <main className="container mx-auto lg:px-40 lg:pt-10">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-10">
        <div className="lg:order-2 lg:w-full">
          <TripReservation trip={trip} />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
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
