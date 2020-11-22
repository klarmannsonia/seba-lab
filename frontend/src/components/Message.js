import React from "react";
import Alert from "@material-ui/lab/Alert";

// severity: error, warning, info, success
const Message = ({ severity, children }) => {
  return (
    <div>
      <Alert severity={severity}>{children}</Alert>
    </div>
  );
};

Message.defaultProps = {
  severity: "info",
};

export default Message;
