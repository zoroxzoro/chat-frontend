import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Grid, IconButton, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMyChatsQuery } from "../../../redux/api/api";
import { setIsMobile } from "../../../redux/reducer/mics";
import { useErrors } from "../../Hooks/hook";
import ChatList from "../../Specific/ChatList";
import ProfileCard from "../../Specific/ProfileCard";
import bg from "../../assets/bg1-removebg-preview-transformed.png";
import Title from "../shared/title";
import Header from "./Header";
import { getSocket } from "../../../socket";

export const AppLayout = (WrappedComponent) => {
  const AppLayoutComponent = (props) => {
    const params = useParams();
    const chatId = params.id; // Ensure params.id is correctly captured
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { isError, isLoading, data, error, refetch } = useMyChatsQuery();
    const socket = getSocket();

    console.log("Chat ID from params:", chatId); // Check if chatId is correctly logged
    console.log("Socket ID:", socket.id);

    useErrors([{ isError, error, fallback: () => refetch() }]);

    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
      <div
        style={{
          background: `url(${bg}) no-repeat center center `,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobile}
            onClose={handleMobileClose}
            PaperProps={{
              sx: {
                maxWidth: "300px",
                backdropFilter: "blur(16px) saturate(159%)",
                WebkitBackdropFilter: "blur(16px) saturate(97%)",
                backgroundColor: "rgba(80, 88, 104, 0.37)",
              },
            }}
          >
            <ChatList w="70vw" chats={data?.chats} chatId={chatId} />
          </Drawer>
        )}
        <div style={{ height: "calc(100vh - 4rem)" }}>
          <Grid container height={"100%"}>
            <Grid
              item
              sm={4}
              md={3}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
              height={"100%"}
            >
              {isLoading ? <Skeleton /> : <ChatList chats={data?.chats} />}
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              lg={6}
              height={"100%"}
              width={"100%"}
            >
              <WrappedComponent {...props} chatId={chatId} user={user} />
            </Grid>
            <Grid
              item
              md={4}
              lg={3}
              sx={{
                display: { xs: "none", md: "block" },
                padding: "2rem",
              }}
              height={"100%"}
            >
              <ProfileCard user={user} />
            </Grid>
          </Grid>
        </div>
        <Box
          sx={{
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>

        <div>Footer</div>
      </div>
    );
  };

  AppLayoutComponent.displayName = "AppLayout";

  return AppLayoutComponent;
};
