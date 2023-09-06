const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
    word: {
        type: String,
        index: true,
    },
    definition: {
        type: String,
    },
    startsWith: {
        type: String,
    },
    tags: {
        type: [String],
    },
})


const Dictionary = mongoose.model('Dictionary', dictionarySchema);


module.exports = Dictionary;