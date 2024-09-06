import { useInfiniteScrollTop } from "6pp";
import { AttachFile, Send } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useChatDetailesQuery, useGetMessagesQuery } from "../../redux/api/api";
import { setIsFileMenu } from "../../redux/reducer/mics";
import { getSocket } from "../../socket";
import {
  NEW_ATTACHMENTS,
  NEW_MESSAGES,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/event"; // Ensure NEW_ATTACHMENT is correctly defined
import FileMenu from "../components/dialog/FileMenu";
import { AppLayout } from "../components/layout/AppLayout";
import MessageComp from "../components/shared/MessageComp";
import { InputBox } from "../components/styles/Styled";
import { useErrors, useSocketEvents } from "../Hooks/hook";
import { removeNewMessagesAlert } from "../../redux/reducer/chat";
import { TypingLoader } from "../components/layout/Loader";

const Chats = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(null);
  const typingTimeout = useRef(null);
  const dispatch = useDispatch();
  const bottomRef = useRef(null);

  const handleAttachClick = (e) => {
    e.preventDefault();
    dispatch(setIsFileMenu(true));
  };

  const handleFileMenuClose = () => {
    setFileMenuAnchorEl(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGES, { chatId: chatId, members, message });
    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const newAttachmentHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.attachment]);
    },
    [chatId]
  );

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

  useErrors(errors);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  useEffect(() => {
    return () => {
      dispatch(removeNewMessagesAlert(chatId));
      setMessages([]);
      setMessage("");
      setPage(1);
      setOldMessages([]);
    };
  }, [chatId]);

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
  // Combine old messages with new messages
  const allMessages = [...(oldMessages || []), ...messages];
  const eventHandler = {
    [NEW_MESSAGES]: newMessagesListener,
    [NEW_ATTACHMENTS]: newAttachmentHandler, // Listen for new attachments
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);
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
        {allMessages.map((msg) => (
          <MessageComp message={msg} User={user} key={msg._id || msg.id} />
        ))}
        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
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
        onSubmit={submitHandler}
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
            onChange={messageOnChange}
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
