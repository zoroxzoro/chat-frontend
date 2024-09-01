import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import moment from "moment";
import PropTypes from "prop-types";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import { CurveButton, SearchField } from "../../components/styles/Styled";
import { matBlack } from "../../components/constants/color";
import { DoughnutChart, LineChart } from "../../Specific/Chart";

// Define the Widget component
const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
      backdropFilter: "blur(16px) saturate(159%)",
      WebkitBackdropFilter: "blur(16px) saturate(97%)",
      backgroundColor: "rgba(80, 88, 104, 0.37)",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

const AdminDashboard = () => {
  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0 ",
        borderRadius: "1rem",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "2rem" }} />
        <SearchField
          sx={{
            backdropFilter: "blur(16px) saturate(159%)",
            WebkitBackdropFilter: "blur(16px) saturate(97%)",
            backgroundColor: "rgba(80, 88, 104, 0.37)",
          }}
        />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: { xs: "none", md: "block" },
            textAlign: "center",
          }}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} Icon={<Person sx={{ fontSize: "3rem" }} />} />
      <Widget title={"Chats"} Icon={<Group sx={{ fontSize: "3rem" }} />} />
      <Widget title={"Messages"} Icon={<Message sx={{ fontSize: "3rem" }} />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              backdropFilter: "blur(16px) saturate(159%)",
              WebkitBackdropFilter: "blur(16px) saturate(97%)",
              backgroundColor: "rgba(80, 88, 104, 0.37)",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem ",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
              backdropFilter: "blur(16px) saturate(159%)",
              WebkitBackdropFilter: "blur(16px) saturate(97%)",
              backgroundColor: "rgba(80, 88, 104, 0.37)",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[20, 80]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

Widget.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.node,
  value: PropTypes.number,
};

export default AdminDashboard;
