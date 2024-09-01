import { Avatar, Stack, Typography } from "@mui/material";
import { transformImage } from "../lib/features";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
const ProfileCard = ({ user }) => {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      sx={{
        marginTop: "1rem",
        marginLeft: "1rem",
        backdropFilter: "blur(16px) saturate(159%)",
        WebkitBackdropFilter: "blur(16px) saturate(97%)",
        backgroundColor: "rgba(80, 88, 104, 0.37)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)",
      }}
    >
      <Avatar
        src={transformImage(user.avatar.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <Profile heading={"Bio"} text={user.bio} />
      <Profile
        heading={"Username"}
        text={user.username}
        Icon={<UserNameIcon />}
      />
      <Profile heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <Profile
        heading={"Joined"}
        text={moment(user?.CreatedAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};
const Profile = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
Profile.propTypes = {
  text: PropTypes.string,
  Icon: PropTypes.element,
  heading: PropTypes.string,
};

ProfileCard.propTypes = {
  user: PropTypes.object,
};

export default ProfileCard;
