import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


router.post("/products/seed", async(req,res)=> {
    const initail = [
    { name: "Fertilizer", price: 200 },
    { name: "Seeds Pack", price: 150 },
    { name: "Tractor Oil", price: 500 },
    { name: "Pesticide", price: 300 },
    { name: "Water Pump", price: 8000 },
    { name: "Sprayer", price: 1200 },
  ];
  const inserted = await Product.insertMany(initial);
  res.json(inserted);
});

router.get("/products" , async (req,res)=>{
    const products = await Product.find().lean();
    res.json(products);
});

export default router;