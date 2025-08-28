import express from "express";
import auth from "../middleware/auth.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// get my cart
router.get("/cart", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).lean();
  res.json(cart || { userId: req.user.id, items: [] });
});

// add to cart
router.post("/cart/add", auth, async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    console.log("👉 Add to cart request body:", req.body);
    console.log("👉 Auth user:", req.user);

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid user" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const idx = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );
    if (idx > -1) {
      cart.items[idx].qty += qty;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        qty,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// update quantity
router.patch("/cart/item/:productId", auth, async (req, res) => {
  const { qty } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const idx = cart.items.findIndex(i => i.productId.toString() === req.params.productId);
  if (idx === -1) return res.status(404).json({ message: "Item not found" });

  if (qty <= 0) {
    cart.items.splice(idx, 1); // remove
  } else {
    cart.items[idx].qty = qty;
  }
  cart.updatedAt = new Date();
  await cart.save();
  res.json(cart);
});

// remove item
router.delete("/cart/item/:productId", auth, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
  cart.updatedAt = new Date();
  await cart.save();
  res.json(cart);
});

// clear cart
router.delete("/cart", auth, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { items: [], updatedAt: new Date() },
    { new: true, upsert: true }
  );
  res.json(cart);
});

export default router;
