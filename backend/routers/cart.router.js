const express = require("express");
const Product = require("../models/products.model");
const router = express.Router();
router.get("/", async (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  itemsInCart = await Promise.all(
    req.session.cart.map(async (item) => {
      const product = await Product.findById(item.productId).populate(
        "category"
      );
      const totalPrice = product.price * item.quantity;
      return {
        product: product,
        quantity: item.quantity,
        totalPrice: totalPrice,
      };
    })
  );
  res.status(200).json(itemsInCart);
});
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ productId, quantity });
  }

  res.json({ message: "Product added to cart", cart: req.session.cart });
});

router.post("/remove", (req, res) => {
  const { productId } = req.body;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(
      (item) => item.productId !== productId
    );
  }

  res.json({ message: "Product removed from cart", cart: req.session.cart });
});

router.post("/clear", (req, res) => {
  req.session.cart = [];
  res.json({ message: "Cart cleared" });
});

module.exports = router;
