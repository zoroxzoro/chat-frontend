import { Box, Typography } from "@mui/material";
import { AppLayout } from "../components/layout/AppLayout";

const Home = () => {
  return (
    <div>
      <Box
        sx={{
          backdropFilter: "blur(16px) saturate(159%)",
          WebkitBackdropFilter: "blur(16px) saturate(97%)",
          backgroundColor: "rgba(80, 88, 104, 0.37)",
          borderRadius: "12px",
          marginLeft: "5rem",
          marginTop: "5rem",
        }}
      >
        <Typography
          color={"white"}
          variant="h5"
          p={"2rem"}
          textAlign={"center"}
        >
          Select a friend to start chatting
        </Typography>
      </Box>
    </div>
  );
};

const WrappedHome = AppLayout(Home);

export default WrappedHome;
