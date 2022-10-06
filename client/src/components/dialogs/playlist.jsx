import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { red } from "@mui/material/colors";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleCreateButtonClick = () => {

  };

  const [playlist, setPlaylist] = React.useState();

  console.log(playlist);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="flex items-center justify-center">
        <Typography>Select Watchlist</Typography>
      </DialogTitle>
      <Divider />
      <List sx={{ pt: 0 }}>
        {playlist.map((pl) => (
          <ListItem button onClick={() => handleListItemClick(pl)} key={pl}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                <ListIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={pl} />
          </ListItem>
        ))}
        <ListItem>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Add New Watchlist
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <PlaylistAddIcon />
                </InputAdornment>
              }
            />
            <Button
              disabled
              sx={{ mt: 1 }}
              variant="text"
              onClick={() => handleCreateButtonClick}
              disableElevation
            >
              Add Watchlist
            </Button>
          </FormControl>
        </ListItem>{" "}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DialogPlaylist({ movie, user }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const fetchAddtoPlaylist = () => {};

  const fetchCreatePlaylist = () => {};

  const fetchPlaylist = () => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<PlaylistAddIcon />}
      >
        <Typography variant="button" sx={{ fontWeight: "bold" }}>
          Add
        </Typography>
      </Button>
      <SimpleDialog
        movie={movie}
        user={user}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
