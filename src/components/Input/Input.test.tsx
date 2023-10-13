import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("should render the input", () => {
    render(<Input placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("should have the correct value typed", async () => {
    render(<Input placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText("Digite aqui");
    await userEvent.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  it("should render the error message", async () => {
    render(
      <Input placeholder="Digite aqui" error errorMessage="Não foi possível" />
    );
    const message = screen.getByText("Não foi possível");
    const input = screen.getByPlaceholderText("Digite aqui");
    expect(input).toHaveClass("border-red-500");
    expect(message).toBeInTheDocument();
  });
});
