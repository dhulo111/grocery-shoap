
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
  let tocken = localStorage.getItem("tocken");

  if (!tocken) {
    return <Navigate to="/login" />
  }

  return children;
}

export default ProtectedRoute;