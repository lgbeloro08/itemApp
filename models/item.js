const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, default: 0},
    price: {type: Number, default: true},
    description: {type: String, defult: ""},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Item', itemSchema); //name of the model