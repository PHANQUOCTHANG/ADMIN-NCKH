const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: String,
  linkFile: String,
  description: String,
  thumbnail: String,
  hotspots: [
    {
      hotspot_id: String,
    },
  ],
  delete: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Model", modelSchema, "model");
module.exports = Model;
