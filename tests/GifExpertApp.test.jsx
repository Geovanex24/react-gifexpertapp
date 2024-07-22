import { fireEvent, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";

describe("Pruebas en <GifExpertApp />", () => {
  const inputValue = "Naruto";

  test("test: se debe escribir en el input una categoría y cambiar su valor", () => {
    render(<GifExpertApp />);

    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: inputValue } });

    expect(input.value).toBe(inputValue);
    // screen.debug();
  });

  test("test: se debe agregar una nueva categoría", () => {
    render(<GifExpertApp />);
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(screen.getByText(inputValue)).toBeTruthy();
  });

  test("test: no se deben agregar categorías duplicadas", () => {
    render(<GifExpertApp />);
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: "One Punch" } });
    fireEvent.submit(form);

    expect(screen.getAllByText("One Punch").length).toBe(1);
    // screen.debug();
  });
});
