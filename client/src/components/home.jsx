import * as React from "react";
import { UserContext } from "../components/contexts/userContext";
import { Navigate } from 'react-router-dom';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Portal from "@mui/material/Portal";
import { styled, useTheme, alpha } from "@mui/material/styles";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import RocketIcon from "@mui/icons-material/RocketLaunch";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Tooltip from '@mui/material/Tooltip';
import DialogPlaylist from "./dialogs/playlist";
import UserMenu from "./userMenu";
const axios = require("axios");

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

// import { styled} from '@mui/material/styles';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const getOutlinedIcon = (text) => {
  switch (text) {
    case "All Movies":
      return <MovieFilterOutlinedIcon />;
    case "action":
      return <WhatshotOutlinedIcon />;
    case "romance":
      return <FavoriteBorderOutlinedIcon />;
    case "scifi":
      return <RocketLaunchOutlinedIcon />;
    case "comedy":
      return <EmojiEmotionsOutlinedIcon />;
    case "horror":
      return <PeopleAltOutlinedIcon />;
    default:
      return <ListIcon />;
  }
};

const getFilledIcon = (text) => {
  switch (text) {
    case "All Movies":
      return <MovieFilterIcon color="primary" />;
    case "action":
      return <WhatshotIcon color="primary" />;
    case "romance":
      return <FavoriteIcon color="primary" />;
    case "scifi":
      return <RocketIcon color="primary" />;
    case "comedy":
      return <EmojiEmotionsIcon color="primary" />;
    case "horror":
      return <PeopleAltIcon color="primary" />;
    default:
      return <ListIcon color="primary" />;
  }
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [fetchingData, setFetchingData] = React.useState(false);
  const [active, setActive] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [queryres, setQueryres] = React.useState("");
  const [cardVisible, setCardVisible] = React.useState(false);
  const { currentUser } = React.useContext(UserContext)
  const [user,setUser] = React.useState(currentUser)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  if (!sessionStorage.getItem('_cookie'))
        return <Navigate to="/login" /> 

  const handleQuery = (e) => {
    setCardVisible(false);
    setQuery(e.target.value);
  };

  const handleClickAway = () => {
    setCardVisible(false);
  };

  const handleSearch = () => {
    if (query) {
      setFetchingData(true)
      let options = {
        method: "GET",
        url: `http://localhost:3000/api/search/${query}`,
      };
      axios
        .request(options)
        .then(function (response) {
          setQueryres(response.data);
          console.log(queryres);
          setCardVisible(true);
          setFetchingData(false)
        })
        .catch(function (error) {
          console.log({ error: error });
        });
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: "flex"}}>
        <AppBar color="secondary" open={open}>
          <Toolbar sx={{ display: "flex", justifyContent:"space-between", overflow:"clip"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex justify-center items-center">
            {query ? (
              <div
                className={`${
                  query ? " translate-x-0 " : " translate-x-full "
                } transition-all duration-300`}
              >
                <LoadingButton
                  onClick={() => handleSearch()}
        loading={fetchingData}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        
        variant="contained"
      >Search
        </LoadingButton>
              </div>
            ) : (
              ""
            )}
            <Search sx={{ m: 1, minWidth:"160px"}}>
              <SearchIconWrapper>
              <MovieFilterOutlinedIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => handleQuery(e)}
                placeholder="Search Movie…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            </div>
            <UserMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ zIndex: "99", position: "absolute" }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} color="primary">
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["All Movies", ...user.genre].map(
              (text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block" }}
                  selected={text.split(" ")[0] === active}
                >
                  <ListItemButton
                    onClick={() => setActive(text.split(" ")[0])}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.split(" ")[0] === active
                        ? getFilledIcon(text)
                        : getOutlinedIcon(text)}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.toUpperCase()}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            <ListItem key={"Playlist"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setActive("Playlists")}
                selected={"Playlists" === active}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {"Playlists" === active
                    ? getFilledIcon("Playlists")
                    : getOutlinedIcon("Playlists")}
                </ListItemIcon>
                <ListItemText
                  primary="Playlist"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main">
          <Portal>
            <div
              className={`z-90 mx-1 lg:my-20 my-[30px] absolute flex w-screen justify-center transition-all duration-300 ${
                cardVisible ? " translate-y-0" : "-translate-y-full"
              }`}
            >
              {cardVisible && queryres.Title ? (
                <Card
                  sx={{
                    width: "auto",
                    border: "2px solid #414141",
                  }}
                  raised={true}
                >
                  <div className="lg:flex overflow-visible max-w-[70vw]">
                    <div className="h-full flex justify-center">
                      <CardMedia
                        sx={{
                          maxWidth: 160,
                          m: 1,
                          borderRadius: "5px",
                          boxShadow: "0px 0px 4px #414141",
                        }}
                        component="img"
                        image={queryres.Poster}
                        alt={queryres.Title}
                      />
                    </div>
                    <CardContent>
                      <div className="justify-between items-stretch h-full">
                        <Typography
                          className="flex-1"
                          gutterBottom
                          variant="h4"
                          component="div"
                          color="primary"
                        >
                          {queryres.Title}
                          {" ("}
                          {queryres.Year}
                          {")"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          <p>
                            <span className="bold text-red capitalize">
                              Country:{" "}
                            </span>{" "}
                            {queryres.Country}
                          </p>
                          <p>
                            <span className="bold text-red capitalize">
                              Genre:{" "}
                            </span>
                            {queryres.Genre}
                          </p>
                          <p>
                            <span className="bold text-red capitalize">
                              Actors:{" "}
                            </span>
                            {queryres.Actors}
                          </p>
                          <p>
                            <span className="bold text-red capitalize">
                              Director:{" "}
                            </span>
                            {queryres.Director}
                          </p>
                          <p>
                            <span className="bold text-red capitalize">
                              Country:{" "}
                            </span>
                            {queryres.Country}
                          </p>
                        </Typography>
                        <Divider />

                        <div
                          title={`Rating: ${
                            queryres.Ratings[0].Value.split("/")[0]
                          }/10`}
                          className="flex justify-between items-center"
                        >
                          {/* <Rating name="read-only" value={3} readOnly /> */}

                          <StyledRating
                            name="highlight-selected-only"
                            defaultValue={
                              parseInt(
                                queryres.Ratings[0].Value.split("/")[0],
                                10
                              ) / 2
                            }
                            readOnly
                            IconContainerComponent={IconContainer}
                            highlightSelectedOnly
                          />
                          <CardActions>
                            <DialogPlaylist movie={queryres} user={user} />
                          </CardActions>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ) : (
                ""
              )}
            </div>
          </Portal>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} key={index}>
                  {/* <Card>xs=2</Card> */}
                  {/* <DialogPlaylist /> */}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
