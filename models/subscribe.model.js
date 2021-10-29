const {Schema, model, SchemaTypes} = require('mongoose');

const Subscribe = new Schema({
    email: String,
});

module.exports = model('Subscribe', Subscribe);