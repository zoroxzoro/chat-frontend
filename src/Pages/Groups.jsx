import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { samepleChats, sampleUsers } from "../components/constants/sampleData";
import PropTypes from "prop-types";
import { Add, Delete, Done, Edit, Menu } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/Styled";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import AvatarCard from "../components/shared/AvatarCard";
import bg from "../assets/bg1-removebg-preview-transformed.png";
import UserItem from "../components/shared/UserItem";
const AddMembers = lazy(() => import("../components/dialog/AddMembers"));
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/DeleteDialog")
);

const Groups = () => {
  const [isedit, setIsEdit] = useState(false);
  const [isGroupName, setGroupName] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isGroupNameUpdated, setGroupNameupdates] = useState("");
  const updateGroupName = () => {
    setIsEdit(false);
  };
  const closeConfirmDeleteHandler = () => {
    setDeleteDialog(false);
  };
  const openConfirmDeleteHandler = () => {
    setDeleteDialog(true);
  };
  const openAddMemberHandler = () => {
    setDeleteDialog(false);
  };
  const isAddMember = false;
  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
  const groupName = (
    <>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {isedit ? (
          <>
            <TextField
              value={isGroupNameUpdated}
              onChange={(e) => setGroupNameupdates(e.target.value)}
            />
            <IconButton onClick={updateGroupName}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h5">{isGroupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <Edit />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const HandleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const navigateBack = () => {
    navigate("/");
  };
  const removeMemberHandler = (id) => {
    console.log("Member Removed", id);
  };
  const HandleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const handleDelete = () => {
    setDeleteDialog(false);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameupdates(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameupdates("");
      setIsEdit(false);
    };
  }, [chatId]);

  const iconBtn = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={HandleMobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            color: "blue",
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <div
      style={{
        background: `url(${bg}) no-repeat center center `,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid container height={"100vh"}>
        <Grid
          overflow={"auto"}
          item
          sm={4}
          display={{ xs: "none", sm: "block" }}
          sx={{
            height: "100vh", // Ensure it has a fixed height
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Enable vertical scrolling
            backdropFilter: "blur(16px) saturate(159%)",
            WebkitBackdropFilter: "blur(16px) saturate(97%)",
            backgroundColor: "rgba(80, 88, 104, 0.37)",
          }}
        >
          <GroupsList w="50vw" myGroups={samepleChats} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
            backdropFilter: "blur(16px) saturate(159%)",
            WebkitBackdropFilter: "blur(16px) saturate(97%)",
            backgroundColor: "rgba(80, 88, 104, 0.37)",
          }}
        >
          {iconBtn}

          {isGroupName && (
            <>
              {groupName}

              <Typography
                margin={"2rem 0"}
                alignSelf={"flex-start"}
                variant="h6"
                color={"whitesmoke"}
              >
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >
                {/* members */}

                {sampleUsers.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))}
              </Stack>
              {ButtonGroup}
            </>
          )}
        </Grid>

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMembers />
          </Suspense>
        )}

        {deleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={deleteDialog}
              handleClose={closeConfirmDeleteHandler}
              handleDelete={handleDelete}
            />
          </Suspense>
        )}
        <Drawer
          sx={{
            display: { sm: "none" },
            width: "50vw",
          }}
          PaperProps={{
            sx: {
              backdropFilter: "blur(16px) saturate(159%)",
              WebkitBackdropFilter: "blur(16px) saturate(97%)",
              backgroundColor: "rgba(80, 88, 104, 0.37)",
            },
          }}
          open={isMobileMenuOpen}
          onClose={HandleMobileClose}
          anchor="left" // Ensures the drawer opens from the left
        >
          <GroupsList w="50vw" myGroups={samepleChats} chatId={chatId} />
        </Drawer>
      </Grid>
    </div>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      height: "100%",
      overflowY: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography color={"whitesmoke"}>{name}</Typography>
      </Stack>
    </Link>
  );
});

GroupListItem.displayName = "GroupListItem";

export default Groups;

GroupsList.propTypes = {
  w: PropTypes.string,
  myGroups: PropTypes.array,
  chatId: PropTypes.string,
};

GroupListItem.propTypes = {
  group: PropTypes.object,
  chatId: PropTypes.string,
};
