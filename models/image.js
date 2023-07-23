const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  base64: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  type:String
});

module.exports = mongoose.model("Image", imageSchema);
