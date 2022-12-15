const express = require("express");
const Wishlist = require("./wishlist.model");
const authMiddleWare = require("../../authMiddleware/authMiddleware");

const app = express.Router();
//get the wishlist of a particular by  userid
app.get("/", authMiddleWare, async (req, res) => {
  try {
    let wishlist = await Wishlist.find({ user: req.id }).populate("product");
    res.status(200).send(wishlist);
  } catch (e) {
    res.status(401).send({ error: true, message: e });
  }
});

app.post("/", authMiddleWare, async (req, res) => {
  const { product } = req.body;
  try {
    let wishlist = await Wishlist.create({
      product,
      user: req.id,
    });
    let wishlistItem = await wishlist.populate("product");
    res.status(200).send(wishlistItem);
  } catch (e) {
    res.status(401).send({ error: true, message: "Something went wrong" });
  }
});
app.delete("/:wishlistId", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.wishlistId);
    res
      .status(200)
      .send({ error: false, message: "wishlist Item deleted successfully" });
  } catch (e) {
    res.status(401).send({ error: true, message: "Something went wrong" });
  }
});

module.exports = app;
