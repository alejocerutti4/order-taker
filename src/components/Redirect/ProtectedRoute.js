import { Navigate } from "react-router-dom";
import {isLoggedIn} from "../../helpers/Auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;