const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect("mongodb+srv://tomekkurcon1:lzvXjgtFvRk32Cei@cluster0.0twnuol.mongodb.net/Pi_project?retryWrites=true&w=majority")
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
