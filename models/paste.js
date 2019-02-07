const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    date: String
});

module.exports = mongoose.model('Paste', pasteSchema);