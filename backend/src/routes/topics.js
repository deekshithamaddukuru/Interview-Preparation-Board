const express = require("express");
const Topic = require("../models/Topic");
const router = express.Router();

router.get("/", async (req, res) => {
  try { res.json(await Topic.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: "Could not fetch topics" }); }
});

router.post("/", async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) { res.status(400).json({ message: "Please provide a valid topic title" }); }
});

router.put("/:id", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) { res.status(400).json({ message: "Could not update topic" }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic deleted" });
  } catch (err) { res.status(400).json({ message: "Could not delete topic" }); }
});

module.exports = router;
