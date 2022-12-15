require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRoutes = require("./features/user/user.routes");
const productRoutes = require("./features/products/product.routes");
const cartRoutes = require("./features/cart/cart.routes");
const wishListRoutes = require("./features/wishlist/wishlist.routes");
let port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/wishlists", wishListRoutes);

app.listen(port, async () => {
  await connect();
  console.log("server running");
});
