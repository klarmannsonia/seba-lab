import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Container>
        <Grid container>
          <Grid item xs={12} className={classes.textCenter}>
            Copyright &copy; SEBA LAB
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
