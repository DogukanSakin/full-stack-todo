const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    complated: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Task", timestamps: true }
);

const task = mongoose.model("Task", taskSchema);

module.exports = task;
