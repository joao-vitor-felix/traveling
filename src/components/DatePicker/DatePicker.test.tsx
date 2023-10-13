import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatePicker from "./DatePicker";

describe("DatePicker", () => {
  it("should render the DatePicker", () => {
    render(<DatePicker placeholderText="Digite aqui" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("should have the correct value typed", async () => {
    render(<DatePicker placeholderText="Digite aqui" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Digite aqui");
    await userEvent.type(input, "22/12/24");
    expect(input).toHaveValue("22/12/24");
  });

  it("should render the error message", async () => {
    render(
      <DatePicker
        placeholderText="Digite aqui"
        error
        errorMessage="Não foi possível"
        onChange={() => {}}
      />
    );
    const message = screen.getByText("Não foi possível");
    expect(message).toBeInTheDocument();
  });
});
