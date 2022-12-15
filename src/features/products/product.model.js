const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
    },
    rating: {
      type: Object,
    },
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
