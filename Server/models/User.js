const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false },
  password: { type: String, required: true },
  fullName: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  email: { type: String, unique: true, required: true },
  isAdmin: { type: Boolean, required: false, default: false },
});
module.exports = mongoose.model("User", userSchema);
