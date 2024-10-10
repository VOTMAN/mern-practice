import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept json data in req.body

app.use("/api/products", productRoutes)

const port = 3001;
app.listen(port, () => {
    connectDB();
    console.log(`Server started on http://localhost:${port}`);
});
