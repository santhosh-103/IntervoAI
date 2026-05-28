const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const interviewRoutes =
  require("./routes/interviewRoutes");

const codeRoutes =
  require("./routes/codeRoutes");

const app = express();

/* Database */

connectDB();

/* Middleware */

app.use(
  cors({
    origin: [
      "https://intervo-ai-delta.vercel.app",
      "http://localhost:5173",
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  })
);

app.use(
  express.json()
);

/* Routes */

app.post(
  "/api/auth/login",
  (req, res) => {
    res.json({
      success: true,
      message: "LOGIN ROUTE WORKING"
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/interview",
  interviewRoutes
);

app.use(
  "/api/code",
  codeRoutes
);

/* Test Route */

app.get(
  "/",
  (req, res) => {

    res
      .status(200)
      .json({
        success: true,
        message:
          "IntervoAI Backend Running 🚀",
      });

  }
);

/* 404 Handler */

app.use(
  (req, res) => {

    res
      .status(404)
      .json({
        success: false,
        message:
          "Route not found",
      });

  }
);

/* Global Error Handler */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      err
    );

    res
      .status(500)
      .json({
        success: false,
        message:
          "Internal Server Error",
      });

  }
);

const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {

    console.log(
      `🚀 Server running on port ${PORT}`
    );

  }
);