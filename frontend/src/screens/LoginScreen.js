import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

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

const LoginScreen = ({ history, location }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  //   useEffect(() => {
  //     if (userInfo) {
  //       history.push(redirect);
  //     }
  //   }, [history, userInfo, redirect]);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // dipatch login
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Typography variant="h5" className={classes.marginTypography}>
        SIGN IN
      </Typography>
      {error && <Message severity="error">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={onSubmitHandler}>
        <div>
          <FormControl variant="outlined" fullWidth className={classes.margin}>
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
          <FormControl variant="outlined" fullWidth className={classes.margin}>
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

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.margin}
        >
          Sign In
        </Button>
      </form>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/regiter"}>
            Register
          </Link>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default LoginScreen;
