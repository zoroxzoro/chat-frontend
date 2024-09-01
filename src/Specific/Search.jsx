import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducer/mics";
import UserItem from "../components/shared/UserItem";
import { useAsyncMutation } from "../Hooks/hook";

const Search = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isSearch } = useSelector((state) => state.misc);
  const [users, setUsers] = useState([]);
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  const search = useInputValidation("");
  const [sendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const addFriendHandler = async (id) => {
    await sendRequest("Sending friend request...", { userId: id });
  };

  const [searchUser] = useLazySearchUserQuery();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.user))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <div>
      <Dialog
        open={isSearch}
        onClose={searchCloseHandler}
        fullScreen={isMobile} // Fullscreen on mobile devices
        PaperProps={{
          sx: {
            backdropFilter: "blur(16px) saturate(159%)",
            WebkitBackdropFilter: "blur(16px) saturate(97%)",
            backgroundColor: "rgba(80, 88, 104, 0.37)",
          },
        }}
      >
        <Stack
          p={isMobile ? "1rem" : "2rem"} // Adjust padding for mobile
          direction={"column"}
          width={isMobile ? "100%" : "25rem"} // Full width on mobile
          sx={{
            marginTop: "1rem",
            marginLeft: "1rem",
            position: "relative",
            left: isMobile ? 0 : "-0.44rem", // Adjust position for mobile
            top: isMobile ? 0 : "-0.44rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <DialogTitle color={"white"} textAlign={"center"}>
              Find People
            </DialogTitle>
            <IconButton onClick={searchCloseHandler} color="inherit">
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            label=""
            value={search.value}
            onChange={search.changeHandler}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List>
            {users.map((i) => (
              <ListItem key={i._id} disableGutters>
                <UserItem
                  user={i}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Dialog>
    </div>
  );
};

export default Search;
