import { screen, render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render the input", () => {
    render(<Button>Send</Button>);
    const button = screen.getByText("Send");
    expect(button).toBeInTheDocument();
  });

  it("should not render the children while in loading state", async () => {
    render(<Button isLoading={true}>Send</Button>);
    const button = screen.queryByText("Send");
    expect(button).not.toBeInTheDocument();
  });

  it("should render the correct primary background style", async () => {
    render(<Button>Send</Button>);
    const button = screen.getByText("Send");
    expect(button).toHaveClass("bg-gray-900 text-white hover:bg-gray-700");
  });

  it("should render the correct outlined background style", async () => {
    render(<Button variant="outlined">Send</Button>);
    const button = screen.getByText("Send");
    expect(button).toHaveClass(
      "bg-transparent border-2 border-primary text-gray-900"
    );
  });

  it("should render the correct danger background style", async () => {
    render(<Button variant="danger">Send</Button>);
    const button = screen.getByText("Send");
    expect(button).toHaveClass(
      "text-red-500 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white"
    );
  });
});
