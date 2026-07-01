import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import FormularioServicio from "./components/pages/FormularioServicio";
import Login from "./components/pages/Login";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import type { Servicio } from "./interfaces/servicios";
import DetalleServicio from "./components/pages/DetalleServicio";

function App() {
  const usuarioSessionStorage = JSON.parse(
    sessionStorage.getItem("usuarioKey") || "false",
  );
  const [usuarioLogueado, setUsuarioLogueado] = useState<boolean>(
    usuarioSessionStorage,
  );
  // agregamos los servicios
  // const serviciosLocalStorage = JSON.parse(
  //   localStorage.getItem("serviciosKey") || "[]",
  // );
  // const [servicios, setServicios] = useState<Servicio[]>(serviciosLocalStorage);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  // useEffect(() => {
  //   localStorage.setItem("serviciosKey", JSON.stringify(servicios));
  // }, [servicios]);

  // logicar para trabajar con los sercicios
  // const crearServicio = (dataServicio: ServicioFormData) => {
  //   const servicioNuevo: Servicio = {
  //     ...dataServicio,
  //     id: crypto.randomUUID(),
  //   };
  //   setServicios([...servicios, servicioNuevo]);
  // };

  // const borrarServicio = (idServicio: string) => {
  //   const serviciosFiltrados = servicios.filter(
  //     (itemServicio) => itemServicio.id !== idServicio,
  //   );
  //   setServicios(serviciosFiltrados);
  // };

  // const editarServicio = (
  //   idServicio: string,
  //   servicioEditar: ServicioFormData,
  // ) => {
  //   const serviciosEditados = servicios.map((itemServicio) => {
  //     if (itemServicio.id === idServicio) {
  //       return { ...itemServicio, ...servicioEditar };
  //     }
  //     return itemServicio;
  //   });
  //   setServicios(serviciosEditados);
  // };

  // const buscarServicio = (idServicio: string): Servicio | undefined => {
  //   return servicios.find((item) => item.id === idServicio);
  // };

  return (
    <AppContext.Provider
      value={{
        usuarioLogueado,
        setUsuarioLogueado,
        // servicios
        // crearServicio,
        // borrarServicio,
        // editarServicio,
        // buscarServicio
      }}
    >
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
          <Menu />
          <main className="container grow mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Inicio></Inicio>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/servicio/:id" element={<DetalleServicio />} />
              <Route path="/administrador" element={<ProtectorRutas />}>
                <Route index element={<Administrador />} />
                <Route
                  path="crear"
                  element={
                    <FormularioServicio
                      titulo={"Crear Servicio"}
                    ></FormularioServicio>
                  }
                />
                <Route
                  path="editar/:id"
                  element={
                    <FormularioServicio
                      titulo={"Editar Servicio"}
                    ></FormularioServicio>
                  }
                />
              </Route>
              <Route path="*" element={<Error404></Error404>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
