import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TripSearch from "./TripSearch";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));
describe("TripSearch", () => {
  it("should render the TripSeach", () => {
    render(<TripSearch />);
    const header = screen.getByText("Encontre sua próxima");
    const input = screen.getByPlaceholderText("Onde você quer ir?");
    const datePicker = screen.getByPlaceholderText("Data Inicial");
    const button = screen.getByRole("button", { name: "Buscar" });
    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should render the error when the input it's not filled", async () => {
    render(<TripSearch />);
    const button = screen.getByRole("button", { name: "Buscar" });
    const input = screen.getByPlaceholderText("Onde você quer ir?");
    await userEvent.click(button);
    const errorMessage = screen.getByText("Por favor, informe onde deseja ir.");
    expect(input).toHaveClass("border-red-500");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should have the correct value typed", async () => {
    render(<TripSearch />);
    const input = screen.getByPlaceholderText("Onde você quer ir?");
    await userEvent.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });
});
