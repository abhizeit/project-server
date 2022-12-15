const express = require("express");
const Cart = require("./cart.model");
const authMiddleWare = require("../../authMiddleware/authMiddleware");

const app = express.Router();

app.get("/", authMiddleWare, async (req, res) => {
  try {
    let cart = await Cart.find({ user: req.id, delivered: false }).populate(
      "product"
    );
    res.status(200).send(cart);
  } catch (e) {
    res.status(401).send({ error: true, message: e });
  }
});
app.get("/recent", authMiddleWare, async (req, res) => {
  try {
    const items = await Cart.find({ user: req.id, delivered: true }).populate(
      "product"
    );

    res.send({ error: false, data: items });
  } catch (e) {
    res.send({ error: true, message: e.message });
  }
});
app.post("/", authMiddleWare, async (req, res) => {
  const { product, quantity = 1, delivered = false } = req.body;
  try {
    let item = await Cart.create({
      product,
      user: req.id,
      quantity,
      delivered,
    });
    let cartItem = await item.populate("product");
    res.status(200).send(cartItem);
  } catch (e) {
    res.status(401).send({ error: true, message: "Something went wrong" });
  }
});

app.patch("/checkout", authMiddleWare, async (req, res) => {
  const { token: t } = req.headers;
  await Cart.updateMany({ user: req.id }, { ...req.body });
  res.send("hello");
});
app.patch("/:id", async (req, res) => {
  try {
    let cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ error: false, message: "Cart updated successfully", cart });
  } catch (e) {
    res.status(401).send({ error: true, message: e });
  }
});

app.delete("/:cartId", async (req, res) => {
  try {
    let deletedItem = await Cart.findByIdAndDelete(req.params.cartId);

    res
      .status(200)
      .send({ error: false, message: "cartItem deleted successfully" });
  } catch (e) {
    res.status(401).send({ error: true, message: "Something went wrong" });
  }
});

module.exports = app;
