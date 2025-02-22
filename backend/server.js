const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const logger = require("./utils/logger");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables early
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Better CORS setup (Restrict to known frontend URL in production)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", 
  credentials: true, 
};
app.use(cors(corsOptions));

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Error handling middleware
app.use(errorMiddleware);

// Serve static assets in production efficiently
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
