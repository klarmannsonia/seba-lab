import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

//swagger
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// import routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

// swagger setup
const swaggerOptions = {
  definition: {
    info: {
      title: "KELVIN API",
      description: "KELVIN API Information",
      version: "1.0.0",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Daniel Bilic",
        email: "danielbilic90@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/userRoutes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// express init
const app = express();
app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
