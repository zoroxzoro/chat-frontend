import {
  Dialog,
  DialogTitle,
  Stack,
  CircularProgress,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem"; // Ensure correct import
import { useState } from "react";

const AddMembers = ({ addMembers, isLoading, chatId }) => {
  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  const closeHandler = () => {
    setMembers([]);
    setSelectMembers([]);
  };
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
      <DialogTitle>Add Members</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2} padding={"2rem"}>
            {Members.length > 0 ? (
              Members.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectMembers.includes(user._id)}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Friends</Typography>
            )}
          </Stack>
        )}
        <Stack
          direction={"row"}
          justifyContent={"center"}
          spacing={"1rem"}
          padding={"1rem"}
        >
          <Button disabled={isLoading} onClick={addMemberSubmitHandler}>
            Submit
          </Button>
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

AddMembers.propTypes = {
  addMembers: PropTypes.func,
  isLoading: PropTypes.bool,
  chatId: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddMembers;
