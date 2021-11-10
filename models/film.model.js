const {Schema, model, SchemaTypes} = require('mongoose');


const Film = new Schema({
    id: String,
    title: {type: String, intl: true},
    slug: { type: String, slug: 'title', slug_padding_size: 1,  unique: true },
    category: {type: String, intl: true},
    country:   {type: String, intl: true},
    languages: {type: String, intl: true},
    duration: String,
    date: String,
    screeningTime: String,
    img: { 
        type: Buffer,
    },
    imgGal: [Buffer],
    description: {type: String, intl: true},
    director: {type: String, intl: true},
    producer: {type: String, intl: true},
    editor: {type: String, intl: true},
    exProducer: {type: String, intl: true},
    cast:  {type: String, intl: true},
    fLink: {type: String, default:'0'},
    show: {
        type: String,
    },
    event:{
        type: Boolean,
        default: false,
    },
});

module.exports = model('Film', Film)