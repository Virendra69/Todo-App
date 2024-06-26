import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) {
      navigate("/login/", {
        replace: true,
      });
    }
  }, []);

  return authToken ? props.component : null;
};

export default ProtectedRoute;
