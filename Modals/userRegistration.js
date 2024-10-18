const mongoose = require("mongoose");
const { Schema } = mongoose;

const registration = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique:true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("registration", registration);
