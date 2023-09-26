import { Metadata } from "next";
import TripSearch from "./components/TripSearch";
import QuickSearch from "./components/QuickSearch/QuickSearch";
import RecommendedTrips from "./components/RecommendedTrips";

export const metadata: Metadata = {
  title: "Início | Traveling",
  description: "Seu sonho também é nosso!"
};

export default function Home() {
  return (
    <main>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </main>
  );
}
