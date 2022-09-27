const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 200,
  },
  cars: {
    type: [String],
    required: true,
  },
});

const users = mongoose.model("User", userSchema);

module.exports = { users };
