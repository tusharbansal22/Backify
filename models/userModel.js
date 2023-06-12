const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username : {
    type: String,
    required : [true, "Please enter a username"]
  },
  email : {
    type: String,
    required : [true, "Please enter an email address"],
    unique: [true,"Email is already in use"]
  },
  password : {
    type: String,
    required : [true, "Please enter a password"]
  }
},{timestamp:true});

module.exports = mongoose.model('User',userSchema);