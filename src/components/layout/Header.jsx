import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExists } from "../../../redux/reducer/auth";
import {
  setIsMobile,
  setIsNotification,
  setIsSearch,
} from "../../../redux/reducer/mics";
import { server } from "../constants/config";

const SearchDialog = lazy(() => import("../../Specific/Search"));
const Notification = lazy(() => import("../../Specific/Notification"));
const NewGroup = lazy(() => import("../../Specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const { isSearch, isNotification } = useSelector((state) => state.misc);

  const [isNewGroup, setIsNewGroup] = useState(false);
  const dispatch = useDispatch();
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const closeSearch = () => {
    dispatch(setIsSearch(false));
  };

  const openNewGroup = () => {
    setIsNewGroup(true);
  };

  const closeNewGroup = () => {
    setIsNewGroup(false);
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const closeNotification = () => {
    dispatch(setIsNotification(false));
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"} width={"100%"}>
        <AppBar
          sx={{
            backdropFilter: "blur(16px) saturate(159%)",
            WebkitBackdropFilter: "blur(16px) saturate(159%)",
            backgroundColor: "rgba(10, 108, 244, 0.8)",
            borderRadius: "2px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            "&:hover": {
              backgroundColor: "rgba(10, 108, 244, 0.7)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.47)",
            },
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                color: "#fff",
                fontSize: "1.5rem",
              }}
            >
              Homies
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={0} // Provide the actual value for notifications badge
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification onClose={closeNotification} />
        </Suspense>
      )}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog onClose={closeSearch} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup onClose={closeNewGroup} />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

IconBtn.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number,
};

export default Header;
