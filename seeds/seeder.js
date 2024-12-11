const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/itemApp')
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

//puts dummy data for test instance
const seedDb = async() => {
    const items = new Item({
        name: 'Ben10 Sando', 
        category: 'Tops',
        quantity: 10,
        price: 10.99,
        description: 'A sample shirt',
    });
    await items.save();
}

seedDb().then(() => {
    mongoose.connection.close();
})