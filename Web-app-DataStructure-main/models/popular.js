const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Popular = mongoose.model('Popular', popularSchema);
module.exports = Popular;