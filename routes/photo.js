const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Photo, validatePhoto } = require("../models/photo");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

// File upload configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routers

//With pagination
router.get("/", async (req, res) => {
  const { page = 1 } = req.query;
  const photo = await Photo.paginate(
    {},
    { page, limit: 10, sort: { _id: -1 } }
  );
  res.send(photo);
});

router.post("/", upload.single("imgPath"), async (req, res) => {
  const { error } = validatePhoto(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    return res.status(400).send("Invalid category");
  }
  let photo = new Photo({
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    city: req.body.city,
    imgPath: req.file.filename,
    category: {
      name: category.name
    }
  });
  photo = await photo.save();
  res.send(photo);
});

router.put("/:id", upload.single("imgPath"), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("The photo with the given id was not found");
  }
  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    return res.status(400).send("Invalid category");
  }

  const photo = await Photo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      country: req.body.country,
      city: req.body.city,
      imgPath: req.file.filename,
      category: {
        name: category.name
      }
    },
    { new: true }
  );
  res.send(await photo.save());
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("The photo with the given id was not found!");
  }
  const photo = await Photo.findByIdAndRemove(req.params.id);
  res.send(photo);
});

//Filters

// Find by Id
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("The photo with the given id was not found!");
  }
  const photo = await Photo.findById({ _id: req.params.id });
  res.send(photo);
});

// Find by country

router.get("/photos/:country", async (req, res) => {
  const photo = await Photo.find({ country: req.params.country });
  res.send(photo);
});
module.exports = router;
