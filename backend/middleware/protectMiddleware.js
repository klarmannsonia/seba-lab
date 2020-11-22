import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asynHandler from "./asyncHandler.js";

const protect = asynHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decode user from jwt
      // decoded: { id: userId ....}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // return user with decoded id without password
      req.user = await User.findById(decoded.id).select("-password");

      console.log(decoded);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
