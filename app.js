require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { initializeEmailScheduler } = require("./utils/email");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

// Initialize email scheduler
initializeEmailScheduler();

// Sync Database
sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error syncing database:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
