import { screen, render } from "@testing-library/react";
import { Prisma } from "@prisma/client";
import TripItem from "./TripItem";

describe("TripItem component", () => {
  it("should render TripItem properly", () => {
    const trip = {
      id: "1",
      name: "Rancho Sereno",
      description: "here lies the description",
      location: "Amsterdam, Holanda",
      locationDescription: "Amsterdã.",
      latitude: 52.3738,
      longitude: 4.89093,
      startDate: new Date(),
      endDate: new Date(),
      pricePerDay: new Prisma.Decimal(99),
      coverImage: "http://www.google.com",
      imagesUrl: ["fgdfgfdgdf", "dfgdf", "dfgfd"],
      highlights: [
        "Café da manhã incluso",
        "Piscina",
        "Wifi grátis",
        "Estacionamento grátis",
        "Vista paradisíaca",
        "Luxuoso"
      ],
      maxGuests: 5,
      countryCode: "NL",
      recommended: false
    };
    render(<TripItem trip={trip} />);
    const tripName = screen.getByText("Rancho Sereno");
    const image = screen.getByAltText("Imagem da viagem Rancho Sereno");
    const price = screen.getByText("R$99");
    expect(tripName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
