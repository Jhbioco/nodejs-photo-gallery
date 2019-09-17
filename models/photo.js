const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { categorySchema } = require("./category");

// Create the photo schema
const photoSchema = new mongoose.Schema({
  title: { type: String, minlength: 3, maxlength: 50, required: true },
  description: { type: String, minlength: 5, maxlength: 400, required: true },
  country: { type: String },
  city: { type: String },
  date: { type: Date, default: Date.now },
  imgPath: { type: String, required: true },
  category: { type: categorySchema, required: true }
});

photoSchema.plugin(mongoosePaginate);

// Create the model
const Photo = mongoose.model("Photo", photoSchema);

// Field Validation with Joi
function validatePhoto(photo) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(400)
      .required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    imgPath: Joi.string(),
    categoryId: Joi.objectId().required()
  };
  return Joi.validate(photo, schema);
}

module.exports.Photo = Photo;
module.exports.validatePhoto = validatePhoto;
