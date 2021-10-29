const {Schema, model, SchemaTypes} = require('mongoose');

const Media = new Schema({
    img: Buffer,
});

module.exports = model('Media', Media)