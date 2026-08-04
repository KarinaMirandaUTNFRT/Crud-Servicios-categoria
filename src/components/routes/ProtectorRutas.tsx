import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/AppContext";

const ProtectorRutas = () => {
  const { usuarioLogueado, loadingSession } = useAppContext();

  // 1. Si aún está verificando la cookie, mostramos un spinner o mensaje dentro de las rutas privadas
  if (loadingSession) {
    return (
      <div className="flex justify-center items-center py-12 text-zinc-400">
        Verificando permisos...
      </div>
    );
  }
  // 2. Una vez que terminó de verificar: si no hay usuario o no es admin, redirige
  if (!usuarioLogueado || usuarioLogueado.rol ==='cliente') {
    return <Navigate to="/login" replace />;
  }
  // 3. Si es admin y está autenticado, renderiza la ruta anidada
  return <Outlet />;
};

export default ProtectorRutas;
