import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe("Pruebas en el hook useFetchGifs", () => {
  test("test: debe de regresar el estado inicial", () => {
    // ¿Cuál es nuestro estado inicial de nuestro hook? => images : [] y isLoading: true

    const { result } = renderHook(() => useFetchGifs("One Punch")); // recibe una función callback que se llama al hook
    const { images, isLoading } = result.current; // result => resultado que regresa el hook cuando es montado

    // Evaluaciones
    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();

    // const { images, isLoading } = useFetchGifs(); //??? Como lo ejecuto
    /*  De esta forma retorna error: "Hooks can only be called inside of the body of a function component.". 
        Esto porque necesitan parte del ciclo de vida del componente en react

        Nota: no es posible evaluarlo de manera aislada!

        Sin embargo, no es inconveniente porque para esto tenemos la función renderHook que importamos de "testing-library/react". 
        Antes era necesario importarese de un paquete de terceros, ahora desde la versión 18 de react ya no!... Simplemente lo manda-
        mos a llamar.
    */
  });
  test("test: debe de retornar un arreglo de imagenes y el isLoading en false", async () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));
    await waitFor(() => {
      expect(result.current.images.length).toBeGreaterThan(0);
    });

    const { images, isLoading } = result.current;

    // Evaluaciones
    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
