import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link as LinkComponent, Navigate } from "react-router-dom";
import AdminBg from "../../assets/At the office-amico.png";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    backdrop-filter: blur(10px) saturate(180%);
    -webkit-backdrop-filter: blur(10px) saturate(180%);
    background-color: rgba(208, 21, 227, 0.62);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const logoutHandler = () => {};

  return (
    <Stack width={w} direction={"column"} p={"1rem"} spacing={"1rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Homies
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "rgba(208, 21, 227, 0.80)",
                color: "white",
                ":hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

Sidebar.propTypes = {
  w: PropTypes.string,
};

const AdminLayout = ({ children }) => {
  const isAdmin = true;

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <div
      style={{
        backgroundImage: `url(${AdminBg}) `,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        container
        minHeight={"100vh"}
        sx={{
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          {children}
        </Grid>

        <Drawer
          open={isMobile}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "80vw", // Adjust the width of the drawer
              maxWidth: "300px", // Set a maximum width for the drawer
              backdropFilter: "blur(16px) saturate(159%)",
              WebkitBackdropFilter: "blur(16px) saturate(97%)",
              backgroundColor: "rgba(80, 88, 104, 0.37)",
            },
          }}
        >
          <Sidebar w="100%" />
        </Drawer>
      </Grid>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
