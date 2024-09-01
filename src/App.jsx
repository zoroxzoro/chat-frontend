import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userExist, userNotExists } from "../redux/reducer/auth";
import NotFoundPage from "./Pages/Notfound";
import ProtectdRoute from "./components/auth/ProtectdRoute";
import { server } from "./components/constants/config";
import { LayoutLoader } from "./components/shared/Loader";
import { SocketProvider } from "../socket";
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Chats = lazy(() => import("./Pages/Chats"));
const Groups = lazy(() => import("./Pages/Groups"));
const AdminLogIn = lazy(() => import("./Pages/Admin/AdminLogIn"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const UserManagement = lazy(() => import("./Pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./Pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./Pages/Admin/MessageManagement"));

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(userExist(data.user));
      })
      .catch((err) => {
        dispatch(userNotExists());
        console.log(err);
      });
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              element={
                <SocketProvider>
                  <ProtectdRoute user={user} />
                </SocketProvider>
              }
            >
              <Route path="/Chats/:id" element={<Chats />} />
              <Route path="/Groups" element={<Groups />} />
              <Route path="/" element={<Home />} />
            </Route>
            <Route
              path="/Login"
              element={
                <ProtectdRoute user={!user} redirect="/">
                  <Login />
                </ProtectdRoute>
              }
            />
            <Route path="/admin" element={<AdminLogIn />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<MessageManagement />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </div>
  );
};

export default App;
