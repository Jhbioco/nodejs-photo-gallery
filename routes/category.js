const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Category, validateCategory } = require("../models/category");

// Routers
router.get("/", async (req, res) => {
  const category = await Category.find().sort({ _id: -1 });
  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let category = new Category({
    name: req.body.name
  });
  res.send(await category.save());
});

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send("the category with the given id was not found!");
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  res.send(await category.save());
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send("the category with the given id was not found!");
  }
  const category = await Category.findByIdAndRemove(req.params.id);
  res.send(category);
});

//Filters

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send("the category with the given id was not found!");
  }
  const category = await Category.findById({ _id: req.params.id });
  res.send(category);
});

module.exports = router;
