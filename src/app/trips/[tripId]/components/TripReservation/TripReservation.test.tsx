import { screen, render } from "@testing-library/react";
import TripReservation from "./TripReservation";
import userEvent from "@testing-library/user-event";
import { Prisma } from "@prisma/client";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe("TripReservation", () => {
  const mockTrip = {
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
  it("should render the trip reservation form", () => {
    render(<TripReservation trip={mockTrip} />);
    const initialDate = screen.getByPlaceholderText("Data inicial");
    const finalDate = screen.getByPlaceholderText("Data final");
    const guests = screen.getByPlaceholderText("Número de hóspedes (max: 5)");
    const button = screen.getByLabelText("Reservar viagem Rancho Sereno");
    expect(initialDate).toBeInTheDocument();
    expect(finalDate).toBeInTheDocument();
    expect(guests).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should show errors if the input are not filled", async () => {
    render(<TripReservation trip={mockTrip} />);
    const button = screen.getByLabelText("Reservar viagem Rancho Sereno");

    await userEvent.click(button);
    screen.getByText("A data inicial é obrigatória.");
    screen.getByText("A data final é obrigatória.");
    screen.getByText("O número de hóspedes é obrigatório.");
  });

  it("should show error if the initial date input is not filled", async () => {
    render(<TripReservation trip={mockTrip} />);
    const finalDate = screen.getByPlaceholderText("Data final");
    const guests = screen.getByPlaceholderText("Número de hóspedes (max: 5)");
    const button = screen.getByLabelText("Reservar viagem Rancho Sereno");

    await userEvent.type(finalDate, "31/12/2024");
    await userEvent.type(guests, "2");
    await userEvent.click(button);
    const message = screen.getByText("A data inicial é obrigatória.");
    expect(finalDate).toHaveValue("31/12/2024");
    expect(guests).toHaveValue(2);
    expect(message).toBeInTheDocument();
  });

  it("should show error if the final date input is not filled", async () => {
    render(<TripReservation trip={mockTrip} />);
    const initialDate = screen.getByPlaceholderText("Data inicial");
    const guests = screen.getByPlaceholderText("Número de hóspedes (max: 5)");
    const button = screen.getByLabelText("Reservar viagem Rancho Sereno");

    await userEvent.type(initialDate, "24/12/2024");
    await userEvent.type(guests, "2");
    await userEvent.click(button);
    const message = screen.getByText("A data final é obrigatória.");
    expect(initialDate).toHaveValue("24/12/2024");
    expect(guests).toHaveValue(2);
    expect(message).toBeInTheDocument();
  });

  it("should show error if the guests input is not filled", async () => {
    render(<TripReservation trip={mockTrip} />);
    const initialDate = screen.getByPlaceholderText("Data inicial");
    const finalDate = screen.getByPlaceholderText("Data final");
    const button = screen.getByLabelText("Reservar viagem Rancho Sereno");

    await userEvent.type(initialDate, "24/12/2024");
    await userEvent.type(finalDate, "31/12/2024");
    await userEvent.click(button);
    expect(initialDate).toHaveValue("24/12/2024");
    expect(finalDate).toHaveValue("31/12/2024");
    screen.getByText("O número de hóspedes é obrigatório.");
  });
});
