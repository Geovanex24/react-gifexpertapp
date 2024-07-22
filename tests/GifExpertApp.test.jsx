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

  // TODO: Agregar más tests.
});
