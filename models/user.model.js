const {Schema, model} = require('mongoose');

const User = new Schema({
    name: {
      type:String,
      required: true,
    },
    email:{
      type:String,
      required: true,
    },
    password: {
      type:String,
      required: true,
    },
    role: String,
});

module.exports = model('User', User)