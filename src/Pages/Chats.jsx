import { useInfiniteScrollTop } from "6pp";
import { AttachFile, Send } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useCallback, useRef, useState } from "react";
import { useChatDetailesQuery, useGetMessagesQuery } from "../../redux/api/api";
import { getSocket } from "../../socket";
import { NEW_MESSAGES } from "../components/constants/event";
import FileMenu from "../components/dialog/FileMenu";
import { AppLayout } from "../components/layout/AppLayout";
import MessageComp from "../components/shared/MessageComp";
import { InputBox } from "../components/styles/Styled";
import { useErrors, useSocketEvents } from "../Hooks/hook";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../../redux/reducer/mics";

const Chats = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleAttachClick = (e) => {
    e.preventDefault();
    dispatch(setIsFileMenu(true));
  };

  const handleFileMenuClose = () => {
    setFileMenuAnchorEl(null);
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log(message);
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGES, { chatId: chatId, members, message });
    setMessage("");
  };
  console.log("chatId", chatId);
  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);
  const eventHandler = { [NEW_MESSAGES]: newMessageHandler };

  const chatDetailes = useChatDetailesQuery({ chatId: chatId, skip: !chatId });
  const members = chatDetailes.data?.chat?.members;
  const oldMessagesChunk = useGetMessagesQuery({
    chatId,
    page,
  });

  const errors = [
    { isError: chatDetailes.error, error: chatDetailes.error },
    { isError: oldMessagesChunk.error, error: oldMessagesChunk.error },
  ];

  useSocketEvents(socket, eventHandler);
  useErrors(errors);
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );
  const allMessages = [...(oldMessages.data?.messages || []), ...messages];
  return (
    <Fragment>
      <Stack
        className="chat-container"
        ref={containerRef}
        style={{
          height: "90%",
          width: "100%",
          marginTop: "1rem",
          backdropFilter: "blur(16px) saturate(159%)",
          WebkitBackdropFilter: "blur(16px) saturate(97%)",
          backgroundColor: "rgba(80, 88, 104, 0.37)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"grey"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {oldMessages.map((i) => (
          <MessageComp message={i} User={user} key={i._id} />
        ))}
      </Stack>

      <form
        className="chat-form"
        style={{
          height: "10%",
          marginTop: "0.5rem",
          backdropFilter: "blur(16px) saturate(159%)",
          WebkitBackdropFilter: "blur(16px) saturate(97%)",
          backgroundColor: "rgba(80, 88, 104, 0.37)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        onSubmit={sumbitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          alignItems={"center"}
          position={"relative"}
          key={"chat-form"}
        >
          <IconButton
            sx={{ rotate: "30deg" }}
            ref={fileMenuRef}
            onClick={handleAttachClick}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type a message...."
            sx={{
              background: "none",
              fontSize: "1rem",
              border: "none",
              "&:focus": {
                outline: "none",
              },
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              backdropFilter: "blur(16px) saturate(159%)",
              WebkitBackdropFilter: "blur(16px) saturate(159%)",
              backgroundColor: "rgba(10, 108, 244, 0.8)",
              borderRadius: "50%",
              rotate: "-30deg",
              marginRight: "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.125)",
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu
        anchorEl={fileMenuAnchorEl}
        chatId={chatId}
        onClose={handleFileMenuClose}
      />
    </Fragment>
  );
};

const WrappedHome = AppLayout(Chats);

Chats.propTypes = {
  chatId: PropTypes.string,
  user: PropTypes.object,
  members: PropTypes.array,
};

export default WrappedHome;
