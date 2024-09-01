import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  useAcceptFriendRequestMutation,
  useGetNotifiactionsQuery,
} from "../../redux/api/api";
import { useErrors } from "../Hooks/hook";
import { setIsNotification } from "../../redux/reducer/mics";
import toast from "react-hot-toast";
const Notification = () => {
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const FriendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res?.data.success) {
        console.log("socket");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      console.log(error);
    }
  };
  const { isNotification } = useSelector((state) => state.misc);
  const { isError, isLoading, data, error } = useGetNotifiactionsQuery();
  console.log(data);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };
  useErrors([{ isError, error }]);

  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          backdropFilter: "blur(16px) saturate(159%)",
          WebkitBackdropFilter: "blur(16px) saturate(97%)",
          backgroundColor: "rgba(80, 88, 104, 0.37)",
        },
      }}
    >
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={"25rem"}
        sx={{
          marginTop: "1rem",
          marginLeft: "1rem",
          position: "relative",
          left: "-0.44rem",
          top: "-0.44rem",
        }}
      >
        <DialogTitle color={"white"}>Notifications</DialogTitle>

        {isLoading ? (
          <Typography>
            <Skeleton />
          </Typography>
        ) : data?.allrequest.length > 0 ? (
          <List>
            {data?.allrequest.map(({ sender, _id }) => (
              <NotificationItem
                key={_id}
                sender={sender}
                _id={_id}
                handler={FriendRequestHandler}
              />
            ))}
          </List>
        ) : (
          <Typography>No Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = ({ sender, _id, handler }) => {
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={sender.avatar} />

        <Typography
          variant="body1"
          color={"white"}
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${sender.name} `}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
};

NotificationItem.propTypes = {
  sender: PropTypes.object,
  _id: PropTypes.string,
  handler: PropTypes.func,
};

export default Notification;
