const productRoutes = require("./routes/productRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("CloudCart Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
