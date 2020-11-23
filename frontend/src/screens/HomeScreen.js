import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.text}>
            HOMESCREEN
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeScreen;
