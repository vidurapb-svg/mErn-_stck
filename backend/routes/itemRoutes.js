const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send("Item added");
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;
