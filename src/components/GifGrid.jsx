import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ({ category }) => {
  // Nunca debemos de colocar la ejecución de funciones directamente en un functional component ¿Por qué?
  // Porque cada vez que está función se vuelva a renderizar, va a volver a ejecutar está función y por consecuancia volverá a ejecutar la función http.
  // getGifs(category); // ⚠️ Mala práctica: llamar la ejecución de una función inmediatamente el componente se crea.

  // ✅ Buena práctica: En lugar de ejecutar funciones directamente en el componente, considerar el uso de efectos secundarios con useEffect para manejar las llamadas HTTP de manera más controlada y eficiente.

  /**
   * Sintaxis
   *
   * useEffect(callback, dependencies?)
   *
   * Se compone de dos argumentos:
   * - callback: La función que queremos ejecutar cuando se disparen los efectos.
   * - dependencies: Lista de dependencias, que son las condiciones por las cuales se quiere volver a ejecutar el callback.
   *
   * Detalles:
   * - Si se dejan las dependencias vacías ([]), significa que este hook solo se va a disparar la primera vez que se construye el componente (comportamiento similar a componentDidMount).
   * - En este caso, si se actualiza el estado, el callback no se volverá a ejecutar, solo se ejecutará al inicio cuando el componente se monta.
   */

  // ✅ Custom Hooks
  /**
   * Desestructuramos un objeto.
   * Podemos retornar lo que sea de un custom hook
   * Aunque sea custom hook, las palabra reservada "use" es parte del estándar de los hooks
   * Podemos ser capaces de recibir muchas cosas, images, isLoading...
   */
  const { images, isLoading } = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>
      {isLoading && <h2>Cargando...</h2>}

      <div className="card-grid">
        {images.map(({ id, ...dataImage }) => (
          <GifItem key={id} {...dataImage} />
        ))}
      </div>
    </>
  );
};
