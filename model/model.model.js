const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: String,
  linkFile: String,
  hotspots: [
    {
      hotspot_id: String,
    },
  ],
  thumbnail: String,
  description: String,
  delete: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Model", modelSchema, "model");
module.exports = Model;
