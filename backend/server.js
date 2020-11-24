import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

//swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger/swagger.js'

// import routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();


// express init
const app = express();
app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/users", userRoutes);

// fallback endpoint for every request with no matching endpoint
app.use(notFound);

// overwrite default express error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
