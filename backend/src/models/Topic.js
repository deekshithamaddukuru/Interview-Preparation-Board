const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: "DSA" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
  notes: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Topic", topicSchema);
