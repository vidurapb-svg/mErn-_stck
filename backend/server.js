const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://vidurapb_db_user:Vpb2000@ac-b7qozwi-shard-00-00.akckl9a.mongodb.net:27017,ac-b7qozwi-shard-00-01.akckl9a.mongodb.net:27017,ac-b7qozwi-shard-00-02.akckl9a.mongodb.net:27017/?ssl=true&replicaSet=atlas-7o6o1u-shard-0&authSource=admin&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB ERROR_ failed to connect:");
    console.log(err);
  });

// Model (with extra field)
const Item = mongoose.model("Item", {
  name: String,
  quantity: Number,
  price: Number
});

// Routes
app.post("/add", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send("Item added");
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});