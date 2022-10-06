import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
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
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

import { UserContext } from "./contexts/userContext";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const defaultHelperTexts = {
  email: "Enter Email",
  password: "Enter Password",
  repassword: "Re-enter Password",
  name: "Enter Name",
};

export const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useContext(UserContext);
  const [auth, setAuth] = useState(false);

  const fetchLogin = (values) => {
    axios
      .post("http://localhost:3000/api/user/login", {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        if (response.data.error && response.data.error === "User Not Found")
          setErrorValues({ ...errorValues, email: "User Not Found" });
        else if (
          response.data.error &&
          response.data.error === "Wrong Password"
        )
          setErrorValues({ ...errorValues, password: "Wrong Password" });
        else if (response.data.error) console.log(response.data.error);
        else {
          console.log(response.data.user);
          setCurrentUser(response.data.user);
          sessionStorage.setItem("_cookie", response.data.accessToken);
          setAuth(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [errorValues, setErrorValues] = useState({
    email: "",
    password: "",
  });

  return auth ? (
    <Navigate to="/" />
  ) : (
    <div className=" transition-all duration-500 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full max-w-xs p-6 m-auto bg-white rounded-md shadow-xl shadow-gray ring-2 ring-gray lg:max-w-xl">
        <Typography variant="h2" gutterBottom>
          Welcome,
        </Typography>
        <form className="mt-6">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ marginBottom: "25px" }} variant="outlined">
              <TextField
                error={errorValues.email !== ""}
                id="outlined-basic"
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                  if (!validateEmail(e.target.value))
                    setErrorValues({
                      ...errorValues,
                      email: "Enter a valid Email address.",
                    });
                  else setErrorValues({ ...errorValues, email: "" });
                }}
                value={values.email}
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                helperText={
                  errorValues.email
                    ? errorValues.email
                    : defaultHelperTexts.email
                }
              />
            </FormControl>
            <FormControl
              sx={{ marginBottom: "25px" }}
              variant="outlined"
              error={false}
            >
              <TextField
                error={errorValues.password !== ""}
                id="password"
                color="secondary"
                type={values.showPassword ? "text" : "password"}
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                  if (e.target.value.length < 1)
                    setErrorValues({
                      ...errorValues,
                      password: `Required Field.`,
                    });
                  else setErrorValues({ ...errorValues, password: "" });
                }}
                value={values.password}
                label="Password"
                helperText={
                  errorValues.password
                    ? errorValues.password
                    : defaultHelperTexts.password
                }
                aria-describedby="component-error-text"
              />
            </FormControl>
            <Button
              disabled={
                errorValues.email ||
                errorValues.password ||
                !(values.email && values.password)
              }
              sx={{ marginBottom: "20px", fontWeight: "bold" }}
              variant="contained"
              onClick={() => fetchLogin(values)}
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
          </Box>
        </form>

        <Div>
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-bold transition-all duration-300 text-red hover:underline"
          >
            Sign up
          </a>
        </Div>
      </div>
    </div>
  );
};

export const SignUpPage = () => {
  const [values, setValues] = useState({
    password: "",
    repassword: "",
    email: "",
    name: "",
    genre: [],
    showPassword: false,
    showConfirmPassword: false,
    showSecondSection: false,
  });

  const { setCurrentUser } = useContext(UserContext);

  const [auth, setAuth] = useState(false);

  const fetchSignup = (values, genre) => {
    axios
      .post("http://localhost:3000/api/user/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
        genre: [...genre],
      })
      .then(function (response) {
        console.log(response.data.user);
        setCurrentUser(response.data.user);
        sessionStorage.setItem("_cookie", response.data.accessToken);
        setAuth(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkboxUtil = (genre) => {
    if (selectedGenre.has(genre)) {
      let newSelected = selectedGenre;
      newSelected.delete(genre);
      setSelectedGenre(newSelected);
    } else {
      let newSelected = selectedGenre;
      newSelected.add(genre);
      setSelectedGenre(newSelected);
    }
    console.log(selectedGenre);
  };

  const [selectedGenre, setSelectedGenre] = useState(new Set(["action"]));

  const [errorValues, setErrorValues] = useState({
    password: "",
    repassword: "",
    email: "",
    name: "",
  });

  return auth ? (
    <Navigate to="/" />
  ) : (
    <div className=" transition-all duration-500 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div
        className={
          values.showSecondSection
            ? "invisible -z-10 absolute opacity-0 overflow-clip transition-transform duration-300"
            : "visible"
        }
      >
        <div className="transition-all duration-500 w-full relative max-w-xs p-6 m-auto bg-white rounded-md shadow-xl shadow-gray ring-2 ring-gray lg:max-w-xl">
          <Typography variant="h2" gutterBottom color="secondary">
            Before We Start,
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ marginBottom: "25px" }} variant="outlined">
              <TextField
                error={errorValues.email !== ""}
                id="outlined-basic"
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                  if (!validateEmail(e.target.value))
                    setErrorValues({
                      ...errorValues,
                      email: "Enter a valid Email address.",
                    });
                  else setErrorValues({ ...errorValues, email: "" });
                }}
                value={values.email}
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                helperText={
                  errorValues.email
                    ? errorValues.email
                    : defaultHelperTexts.email
                }
              />
            </FormControl>
            <FormControl
              sx={{ marginBottom: "25px" }}
              variant="outlined"
              error={false}
            >
              <TextField
                error={errorValues.password !== ""}
                id="password"
                color="secondary"
                type={values.showPassword ? "text" : "password"}
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                  if (e.target.value.length < 8)
                    setErrorValues({
                      ...errorValues,
                      password: `Password should be of length >= 8.`,
                    });
                  else setErrorValues({ ...errorValues, password: "" });
                }}
                value={values.password}
                label="Password"
                helperText={
                  errorValues.password
                    ? errorValues.password
                    : defaultHelperTexts.password
                }
                aria-describedby="component-error-text"
              />
              {/* <FormHelperText id="component-error-text">{defaultHelperTexts.password}</FormHelperText> */}
            </FormControl>
            <FormControl sx={{ marginBottom: "25px" }} variant="outlined">
              <TextField
                error={errorValues.repassword !== ""}
                id="password"
                color="secondary"
                type={values.showConfirmPassword ? "text" : "password"}
                onChange={(e) => {
                  setValues({ ...values, repassword: e.target.value });
                  if (e.target.value !== values.password)
                    setErrorValues({
                      ...errorValues,
                      repassword: "Both passwords should be same.",
                    });
                  else setErrorValues({ ...errorValues, repassword: "" });
                }}
                value={values.repassword}
                label="Confirm Password"
                helperText={
                  errorValues.repassword
                    ? errorValues.repassword
                    : defaultHelperTexts.repassword
                }
              />
            </FormControl>
            <Button
              disabled={
                errorValues.password ||
                errorValues.repassword ||
                errorValues.email ||
                !(values.password && values.email && values.repassword)
              }
              onClick={() => setValues({ ...values, showSecondSection: true })}
              sx={{ marginBottom: "20px", fontWeight: "bold" }}
              variant="contained"
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </Box>
          <Div>
            {" "}
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-bold transition-all duration-300 text-red hover:underline"
            >
              Sign in
            </a>
          </Div>
        </div>
      </div>
      <div
        className={
          values.showSecondSection
            ? "visible translate-x-0 transition-all duration-300"
            : "invisible transition-all duration-300 delay-500 -z-10 absolute -translate-x-[100%]"
        }
      >
        <div className="transition-all duration-500 w-full relative max-w-xs p-6 m-auto bg-white rounded-md shadow-xl shadow-gray ring-2 ring-gray lg:max-w-xl">
          <Typography variant="h2" gutterBottom color="secondary">
            Few More Things.
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ marginBottom: "25px" }} variant="outlined">
              <TextField
                error={errorValues.name !== ""}
                id="outlined-basic"
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                  if (e.target.value === "")
                    setErrorValues({
                      ...errorValues,
                      name: "Name can't be empty.",
                    });
                  else setErrorValues({ ...errorValues, name: "" });
                }}
                value={values.name}
                label="Your Name"
                variant="outlined"
                color="secondary"
                helperText={
                  errorValues.name ? errorValues.name : defaultHelperTexts.name
                }
              />
            </FormControl>

            <FormControl sx={{ marginBottom: "25px" }} variant="outlined">
              <FormLabel
                sx={{ marginBottom: "15px" }}
                component="legend"
                color="primary"
              >
                Choose Your Genre
              </FormLabel>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<WhatshotOutlinedIcon />}
                      checkedIcon={<WhatshotIcon />}
                      defaultChecked
                      onClick={() => checkboxUtil("action")}
                    />
                  }
                  label="Action"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorderOutlinedIcon />}
                      checkedIcon={<FavoriteIcon />}
                      onClick={() => checkboxUtil("romance")}
                    />
                  }
                  label="Romance"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RocketLaunchOutlinedIcon />}
                      checkedIcon={<RocketIcon />}
                      onClick={() => checkboxUtil("scifi")}
                    />
                  }
                  label="Sci-Fi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<EmojiEmotionsOutlinedIcon />}
                      checkedIcon={<EmojiEmotionsIcon />}
                      onClick={() => checkboxUtil("comedy")}
                    />
                  }
                  label="Comedy"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<PeopleAltOutlinedIcon />}
                      checkedIcon={<PeopleAltIcon />}
                      onClick={() => checkboxUtil("horror")}
                    />
                  }
                  label="Horror"
                />
              </div>
            </FormControl>
            <FormControl sx={{ marginBottom: "20px" }} variant="outlined">
              <Button
                disabled={errorValues.name || !values.name}
                sx={{ fontWeight: "bold" }}
                variant="contained"
                endIcon={<LoginIcon />}
                onClick={() => fetchSignup(values, selectedGenre)}
              >
                Sign Up
              </Button>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
};
