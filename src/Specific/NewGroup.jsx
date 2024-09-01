import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../components/constants/sampleData";
import UserItem from "../components/shared/UserItem";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const [Members, setMembers] = useState(sampleUsers);
  const [selectMembers, setSelectMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
    console.log(selectMembers);
  };

  const isLoadingSendFriendRequest = false;

  const handleCreate = () => {
    // Add your group creation logic here
    console.log("Group created with name:", groupName.value);
    console.log("Selected members:", selectMembers);
  };

  const closeHandler = () => {};
  const handleCancel = () => {
    // Add your cancel logic here
    console.log("Group creation canceled");
  };

  return (
    <Dialog
      open
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
        <DialogTitle textAlign={"center"} variant="h4" color={"white"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          fullWidth
        />

        <Typography color={"white"} variant="body1" sx={{ marginTop: "1rem" }}>
          Members
        </Typography>
        <Stack>
          {Members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              isAdded={selectMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          sx={{ marginTop: "1rem" }}
        >
          <Button variant="text" onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
