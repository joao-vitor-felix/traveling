import { screen, render } from "@testing-library/react";
import Navigation from "./Navigation";
import * as nextAuth from "next-auth/react";
import { Session } from "next-auth";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react");

describe("Navigation", () => {
  const mockSession: Session = {
    expires: "1",
    user: { email: "a", name: "Delta", image: "http://www.google.com" }
  };
  it("renders the navigation with the Login button when the user is not authenticated", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: undefined
    });

    render(<Navigation />);

    const button = screen.getByText("Login");
    expect(button).toBeInTheDocument();
  });

  it("renders the navigation with the user information when the user is authenticated", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession
    });

    render(<Navigation />);

    const image = screen.getByAltText("Imagem do usuário Delta");
    expect(image).toBeInTheDocument();
  });

  it("renders the spinner when the status is loading", () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "loading",
      data: undefined
    });

    render(<Navigation />);

    const spinner = screen.getByLabelText("Carregando...");
    expect(spinner).toBeInTheDocument();
  });

  it("should render the menu when the menu icon is clicked", async () => {
    (nextAuth.useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: mockSession
    });

    render(<Navigation />);

    const menu = screen.getByLabelText("Abrir menu");
    await userEvent.click(menu);
    const trips = screen.getByText("Minhas viagens");
    expect(trips).toBeInTheDocument();
  });
});
