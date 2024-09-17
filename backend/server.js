import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept json data in req.body

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}) // Empty Object means we want all the data within collection
    res.status(200).json({ success: true, data: products})
  } catch (err) {
    console.error("Error in fetching Product: ", err.message)
    res.status(500).json({ success: false, message: "Server Error"})
  }
})

app.post("/api/products", async (req, res) => {
    const product = req.body; // data sent by user

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error("Error in Create Product: ", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.put("/api/products/:id", async (req, res) => {
  const id = req.params.id
  // console.log(id)
  
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) { // Checks to see if the given id exists within db
    return res.status(404).json({ success: false, message: "Product not found"})
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product /*we only need to pass the updated fields*/, {new:true}) // `{new: true}` allows us to get the updated object              
    res.status(200).json({ success: true, data: updatedProduct})                    // instead of the old object
    // console.log(product)
  } catch (err) {
    console.error("Error in updating product: ", err.message)
    res.status(500).json({ success: false, message: "Server Error"})
  }
})

app.delete("/api/products/:id", async (req, res) => { 
  const {id} = req.params
  // console.log(id)
  
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Product Deleted"})
  } catch (err) {
    // console.error("Error in Delete Product: ", err.message)
    res.status(404).json({ success: false, message: "Product not found"})
  }
})

const port = 3001;
app.listen(port, () => {
    connectDB();
    console.log(`Server started on http://localhost:${port}`);
});