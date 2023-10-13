import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyInput from "./CurrencyInput";

describe("Currency Input", () => {
  it("should render the input", () => {
    render(<CurrencyInput placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("should not be able to type string", async () => {
    render(<CurrencyInput placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText("Digite aqui");
    await userEvent.type(input, "Hello World");
    expect(input).toHaveValue("");
  });

  it("should have the correct value typed", async () => {
    render(<CurrencyInput placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText("Digite aqui");
    await userEvent.type(input, "224");
    expect(input).toHaveValue("R$\u00a0224");
  });

  it("should render the error message", async () => {
    render(
      <CurrencyInput
        placeholder="Digite aqui"
        error
        errorMessage="Não foi possível"
      />
    );
    const message = screen.getByText("Não foi possível");
    expect(message).toBeInTheDocument();
  });
});
