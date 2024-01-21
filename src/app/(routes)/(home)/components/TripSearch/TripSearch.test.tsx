import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TripSearch from "./TripSearch";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

const renderComponent = () => {
  render(<TripSearch />);

  const header = screen.getByRole("heading", {
    name: "Encontre sua próxima viagem!"
  });
  const input = screen.getByRole("textbox", { name: "Onde você quer ir?" });
  const datePicker = screen.getByPlaceholderText("Data Inicial");
  const button = screen.getByRole("button", { name: "Buscar viagem" });

  return { header, input, datePicker, button };
};

describe("TripSearch", () => {
  it("should render the TripSearch", () => {
    const { button, datePicker, header, input } = renderComponent();
    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should render the error when the input it's not filled", async () => {
    const { button, input } = renderComponent();
    await userEvent.click(button);
    const errorMessage = screen.getByText("Por favor, informe onde deseja ir.");
    expect(input).toHaveClass("border-red-500");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should have the correct value typed", async () => {
    const { input } = renderComponent();
    await userEvent.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });
});
