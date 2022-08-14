import { Navigate } from "react-router-dom";
import {isLoggedIn} from "../../helpers/Auth";

const HomeRedirect = ({ children }) => {
  if (isLoggedIn()) {
    // user is not authenticated
    return <Navigate to="/home" />;
  }
  return children;
};

export default HomeRedirect;