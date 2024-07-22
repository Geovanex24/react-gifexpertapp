const { render, screen, fireEvent } = require("@testing-library/react");
const { AddCategory } = require("../../src/components/AddCategory");

/**
 * ¿Cómo nos aseguramos de que esta prueba realmente pase?
 *
 * Con esta prueba estamos evaluando:
 *
 * - Que el estado se cambie correctamente.
 * - Más aspectos relacionados.
 *
 * Si, por ejemplo, eliminamos la línea en el componente que cambia el estado,
 * nuestra prueba no pasará con éxito.
 *
 * Y obtendremos:
 *  Expected: "Saitama"
 *  Received: ""
 *
 * Confirmando que evidentemente no se cambio el valor, debido a que no existe o no se invocó la función que cambia el estado de nuestro componente.
 */
describe("Pruebas en <AddCategory />", () => {
  const inputValue = "Saitama";
  test("test: debe de cambiar el valor de la caja de texto", () => {
    render(<AddCategory onNewCategory={() => {}} />);
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: inputValue } });

    expect(input.value).toBe(inputValue);
  });

  test("test: debe de llamar onNewCategory si el input tiene un valor", () => {
    const onNewCategory = jest.fn(); //Mock es una simulación de nuestra función. No la implementación real. Al ser un jest mock tenemos el control de esa función en particular

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    // 1. El input value sea igual a un string vacío
    expect(input.value).toBe("");

    // 2. La función onNewCategory sea invocada
    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
  });

  test("test: no debe de llamar el onNewCategory si el input es vacío", () => {
    const onNewCategory = jest.fn(); //Mock es una simulación de nuestra función. No la implementación real. Al ser un jest mock tenemos el control de esa función en particular

    render(<AddCategory onNewCategory={onNewCategory} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(onNewCategory).not.toHaveBeenCalled();
  });
});
