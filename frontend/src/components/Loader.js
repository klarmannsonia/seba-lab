import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loader: {
    width: "100px",
    height: "100px",
    margin: "auto",
    display: "block",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <>
      <CircularProgress size={68} className={classes.loader} />
    </>
  );
};

export default Loader;
