const {Schema, model, SchemaTypes} = require('mongoose');

const Partner = new Schema({
    name: String,
    link: String,
    img: Buffer,
});

module.exports = model('Partner', Partner)