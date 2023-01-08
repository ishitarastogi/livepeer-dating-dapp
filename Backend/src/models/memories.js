const mongoose = require("mongoose");
const user = require('./Users');

const memoriesSchema = mongoose.Schema(
  {
        memoryDate:{
            type: String,
            required: true
        },
        memoryDescription:{
            type: String,
            required: true
        },
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: user,
          },
      },
 
  { timestamps: true }
);

module.exports = mongoose.model("memories", memoriesSchema);
