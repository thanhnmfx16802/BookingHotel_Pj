const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    distance: { type: Number, required: true },
    photos: { type: Array, required: true },
    desc: { type: String, required: true },
    cheapestPrice: { type: Number, required: true },
    rating: { type: Number, required: false },
    featured: { type: Boolean, required: true },
    rooms: { type: Array, required: true },
  },
  { colletion: "hotels" }
);
module.exports = mongoose.model("Hotel", hotelSchema);
