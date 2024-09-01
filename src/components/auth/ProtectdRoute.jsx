import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectdRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

ProtectdRoute.propTypes = {
  children: PropTypes.node,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  redirect: PropTypes.string,
};
export default ProtectdRoute;
