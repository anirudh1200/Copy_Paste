const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});

modeule.exports = mongoose.model('Paste', pasteScheme);