const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(express.json());

app.use(cors({
  origin:["http://localhost:3000", "https://pi-project.onrender.com"]
}));

app.use("/auth", authRoutes);
app.use("/dashboard",dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
