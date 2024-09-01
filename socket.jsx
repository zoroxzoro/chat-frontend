import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./src/components/constants/config";
import PropTypes from "prop-types";
const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(`${server}/`, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

SocketProvider.prototype = {
  children: PropTypes.node,
};

export { SocketProvider, getSocket };
