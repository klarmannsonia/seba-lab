import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";

// components
import Message from "../components/Message";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginTypography: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ProfileScreen = ({ history, location }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setshowPassword] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // check if password and confirm password are the same
    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password do not match");
    } else {
      // dipatch update profile
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4} direction="column">
        <Typography variant="h6" className={classes.marginTypography}>
          USER PROFILE
        </Typography>
        {error && <Message severity="error">{error}</Message>}
        {message && <Message severity="error">{message}</Message>}
        {success && <Message severity="success">Profile Updated</Message>}
        {loading && <Loader />}
        <form onSubmit={onSubmitHandler}>
          <div>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.margin}
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                type={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelWidth={70}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.margin}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelWidth={70}
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.margin}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.margin}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.margin}
          >
            Update
          </Button>
        </form>
      </Grid>
      <Grid item xs={8} direction="column">
        <Typography variant="h6" className={classes.marginTypography}>
          SOME MORE USER INFO ...
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
