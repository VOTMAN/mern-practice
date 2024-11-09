import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path" 

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept json data in req.body

const __dirname = path.resolve()

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    connectDB();
    console.log(`Server started on http://localhost:${port}`);
});
