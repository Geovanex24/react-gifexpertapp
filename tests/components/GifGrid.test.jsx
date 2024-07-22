import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock("../../src/hooks/useFetchGifs"); // el path completo del hook

describe("Pruebas en <GifGrid />", () => {
  const category = "One Punch";

  test("test: debe de mostrar el loading inicialmente", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText("Cargando..."));
    expect(screen.getByText(category));
  });

  test("test: debe de mostrar items cuando se cargan las imagenes useFetchGifs", () => {
    /**
     * 1. Antes de renderizar el sujeto de pruebas, se debe crear el mock del hook.
     *    ¿Cómo lo hacemos?
     *
     *    - Primero, importamos el hook del cual deseamos hacer un mock. En este caso "useFetchGifs".
     *    - Luego, creamos el mock con la siguiente instrucción: `jest.mock("../../src/hooks/useFetchGifs");`.
     *    - Esto no solo sirve para crear un mock de nuestras propias librerías, sino también de terceros.
     *
     *    Nota: Para que no marque error, tengo que decirle a mi aplicación o test suite cómo va a funcionar el hook,
     *          con un objeto que simule lo que regresa esta función.
     *
     *    Ejemplo:
     *    useFetchGifs.mockReturnValue({
     *        images: [],
     *        isLoading: true,
     *    });
     */
    const gifs = [
      {
        id: "sajsan27a8Ah",
        title: "Saitama",
        url: "https://localhost/saitama.jpg",
      },
      {
        id: "123",
        title: "Goku",
        url: "https://localhost/Goku.jpg",
      },
    ];
    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    expect(screen.getAllByRole("img").length).toBe(2);
  });
});
