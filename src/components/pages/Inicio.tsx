import { useEffect, useState, type SubmitEvent } from "react";
// import { useAppContext } from "../../context/AppContext";
import { listarServiciosApi } from "../../helpers/queries";
import CardServicio from "../services/CardServicio";
import type { Servicio } from "../../interfaces/servicios";

const Inicio = () => {
  // const { servicios } = useAppContext();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  //estos state son para manejar los botones del paginado y la cantidad de servicios que se muestran
  const [cantidadServicios, setCantidadServicios] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [termino, setTermino] = useState(""); //Es lo que el usuario escribe en tiempo real
  const [filtro, setFiltro] = useState(""); //Es el valor confirmado para buscar en el submit
  const [isLoading, setIsLoading] = useState(false);
  const cantServicios = 8;

  useEffect(() => {
    cargarServicios(paginaActual, filtro);
  }, [paginaActual, filtro]);

  const cargarServicios = async (
    paginaNumero: number,
    terminoFiltro: string,
  ) => {
    //estamos cargando los datos
    setIsLoading(true);
    try {
      const respuestaServicios = await listarServiciosApi({
        pagina: paginaNumero,
        limite: cantServicios,
        termino: terminoFiltro || undefined,
      });

      if (respuestaServicios.ok) {
        const datos = await respuestaServicios.json();
        // Con || (OR lógico) cualquier falsy 0, false, null, undefined
        // Con ?? (Fusión nula, Nullish Coalescing Operator)
        setServicios(datos.servicios ?? []); // ?? retorna B unicamente si es A es null
        setCantidadServicios(datos.cantidadServicios ?? 0);
        setTotalPaginas(datos.totalPaginas ?? 1);

        if (
          typeof datos.paginaActual === "number" &&
          datos.paginaActual !== paginaNumero
        ) {
          setPaginaActual(datos.paginaActual);
        }
      } else {
        setServicios([]);
        setCantidadServicios(0);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error(error);
      setServicios([]);
      setCantidadServicios(0);
      setTotalPaginas(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuscar = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaginaActual(1);
    setFiltro(termino.trim());
  };

  const handleLimpiarFiltro = () => {
    setTermino("");
    setFiltro("");
    setPaginaActual(1);
  };

  const cambiarPagina = (pagina: number) => {
    if (pagina < 1 || pagina > totalPaginas || pagina === paginaActual) return;
    setPaginaActual(pagina);
  };

  return (
    <section className="space-y-8 animate-fadeIn">
      <div className="space-y-6 border-b border-zinc-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Catálogo de <span className="text-blue-500">Servicios</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Explora nuestras soluciones tecnológicas personalizadas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              {cantidadServicios} servicios disponibles
            </div>
            <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Página {paginaActual} de {totalPaginas}
            </div>
          </div>
        </div>
        {/* formulario para filtrar */}
        <form
          onSubmit={handleBuscar}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <label className="sr-only" htmlFor="buscador-servicios">
            Buscar servicios
          </label>
          <input
            id="buscador-servicios"
            type="text"
            value={termino}
            onChange={(event) => setTermino(event.target.value)}
            placeholder="Buscar por nombre, categoría o descripción"
            className="w-full sm:w-96 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Buscar
          </button>
          {filtro && (
            <button
              type="button"
              onClick={handleLimpiarFiltro}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Limpiar filtro
            </button>
          )}
        </form>
      </div>
      {/* guilla de cards */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
          <i className="bi bi-arrow-repeat animate-spin text-4xl text-zinc-700 mb-4"></i>
          <p className="text-zinc-500">Cargando servicios...</p>
        </div>
      ) : servicios.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {servicios.map((servicio) => (
              <CardServicio key={servicio._id} servicio={servicio} />
            ))}
          </div>
          {/* pie de la grilla */}
          {(totalPaginas > 1 || cantidadServicios > cantServicios) && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
              <div className="text-sm text-zinc-400">
                Mostrando {servicios.length} de {cantidadServicios} resultados
              </div>



              {/* botones de paginacion */}
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={paginaActual === 1}
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  className="px-4 py-2 rounded-ml 
                  text-sm 
                  font-semibold
                  transition-colors 
                  disabled:opacity-40 
                  disabled:cursor-not-allowed
                   bg-zinc-900 border
                    border-zinc-800
                     hover:bg-zinc-800"
                >
                  Anterior
                </button>

                <span className="px-3 py-2 text-sm text-zinc-400">
                  Página {paginaActual} de {totalPaginas}
                </span>

                <button
                  type="button"
                  disabled={paginaActual === totalPaginas}
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
          <i className="bi bi-search text-4xl text-zinc-700 mb-4"></i>
          <p className="text-zinc-500">
            No se encontraron servicios{" "}
            {filtro ? `para '${filtro}'` : "disponibles"}.
          </p>
        </div>
      )}
    </section>
  );
};

export default Inicio;
