import { Metadata } from "next";
import SearchTripList from "./components/SearchTripList";

export const metadata: Metadata = {
  title: "Buscar Viagens | Traveling",
  description: "Encontre a viagem perfeita para você"
};

const SearchTrip = () => {
  return <SearchTripList />;
};

export default SearchTrip;
