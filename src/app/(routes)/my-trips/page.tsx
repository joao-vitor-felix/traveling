import { Metadata } from "next";
import TripList from "./components/TripList";

export const metadata: Metadata = {
  title: "Minhas Viagens | Traveling",
  description: "Veja as viagens que você reservou"
};

const MyTrips = () => {
  return <TripList />;
};

export default MyTrips;
