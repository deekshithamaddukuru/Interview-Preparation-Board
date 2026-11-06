require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const topicRoutes = require("./routes/topics");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Interview Preparation Board API is running"));
app.use("/api/topics", topicRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
