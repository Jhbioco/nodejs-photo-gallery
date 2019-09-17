const mongoose = require("mongoose");
const Joi = require("joi");

// Create the category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, minlengt: 3, maxlength: 50 }
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

// Field Validation with Joi
function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(category, schema);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
module.exports.categorySchema = categorySchema;
