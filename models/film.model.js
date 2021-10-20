const {Schema, model, SchemaTypes} = require('mongoose');

const Film = new Schema({
    id: String,
    title: String,
    category: String,
    country: String,
    duration: String,
    date: String,
    screeningTime: String,
    img: Buffer,
    description: String,
    director: String,
    producer: String,
    editor: String,
    exProducer: String,
    editor: String,
    cast: String,
    fLink: String,
    show: {
        type: String,
    }
});

module.exports = model('Film', Film)