const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const codeRoutes = require("./routes/codeRoutes");

const app = express();

/* Database */
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://intervo-ai-tawny.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());


/* TEST LOGIN ROUTE */


/* Routes */
app.use("/api/auth", authRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/code", codeRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntervoAI Backend Running 🚀",
  });
});

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});