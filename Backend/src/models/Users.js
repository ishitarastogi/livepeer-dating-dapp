const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    profileID: {
      type: String,
      required: true,
    },
    Name: {
        type: String,
        required: true,
      },
    walletAddress: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
