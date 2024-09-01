import PropTypes from "prop-types";
import { Stack } from "@mui/material";

import ChatItem from "../components/shared/ChatItems";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      sx={{
        marginTop: "1rem",
        backdropFilter: "blur(16px) saturate(159%)",
        WebkitBackdropFilter: "blur(16px) saturate(97%)",
        backgroundColor: "rgba(80, 88, 104, 0.37)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)",
      }}
    >
      {chats.length === 0 ? (
        <div>No chats available</div>
      ) : (
        chats.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          // console.log("Rendering ChatItem:", {
          //   avatar,
          //   _id,
          //   name,
          //   groupChat,
          //   members,
          //   newMessageAlert,
          //   isOnline,
          // });

          return (
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })
      )}
    </Stack>
  );
};

ChatList.propTypes = {
  w: PropTypes.string,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.arrayOf(PropTypes.string),
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      groupChat: PropTypes.bool,
      members: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  chatId: PropTypes.string,
  onlineUsers: PropTypes.arrayOf(PropTypes.string),
  newMessagesAlert: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string,
      count: PropTypes.number,
    })
  ),
  handleDeleteChat: PropTypes.func,
};

export default ChatList;
