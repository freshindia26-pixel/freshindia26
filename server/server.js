const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orders");


const uploadRoutes = require("./routes/upload");

const pool = require("./config/db");
const productRoutes = require("./routes/products");
const app = express();
const authRoutes = require("./routes/auth");
app.use(cors());
app.use(express.json());

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("FreshIndia API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);