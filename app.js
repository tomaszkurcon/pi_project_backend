const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();
app.use(express.json());

app.use(cors());
app.use(authRoutes);

mongoose
  .connect("mongodb+srv://tomekkurcon1:lzvXjgtFvRk32Cei@cluster0.0twnuol.mongodb.net/Pi_project?retryWrites=true&w=majority")
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
