const mongoose = require("mongoose");

const worldIDSchema = mongoose.Schema(
  {
    nullifier_hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("worldID", worldIDSchema);
