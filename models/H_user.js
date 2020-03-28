const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const H_userSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pnum: {
    type:Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Model
const H_user = mongoose.model('H_user', H_userSchema);
module.exports = H_user;
