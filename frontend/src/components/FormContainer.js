import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const FormContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={4}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
