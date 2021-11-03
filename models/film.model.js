const {Schema, model, SchemaTypes} = require('mongoose');


const Film = new Schema({
    id: String,
    title: String,
    slug: { type: String, slug: 'title', slug_padding_size: 1,  unique: true },
    category: String,
    country: String,
    languages: String,
    duration: String,
    date: String,
    screeningTime: String,
    img: { 
        type: Buffer,
    },
    imgGal: [Buffer],
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