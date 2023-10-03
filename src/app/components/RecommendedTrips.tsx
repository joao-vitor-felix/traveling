import TripItem from "@/components/TripItem/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";

const fetchTrips = async () => {
  try {
    const trips = await prisma.trip.findMany({});
    return trips;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

const RecommendedTrips = async () => {
  const data = await fetchTrips();

  return (
    <section className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-primary"></div>
        <h2 className="px-4 text-base font-medium text-primary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-primary"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5 lg:grid lg:grid-cols-3 lg:place-items-center lg:gap-y-10 lg:mt-10">
        {data &&
          data.map((trip: Trip) => <TripItem key={trip.id} trip={trip} />)}
      </div>
    </section>
  );
};

export default RecommendedTrips;
