const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(express.json());

app.use(cors());
app.use(authRoutes);
app.use(dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
