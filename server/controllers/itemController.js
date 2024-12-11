const mongoose = require('mongoose');
const Item = require('../../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/itemApp')
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

//list of all items
exports.items = async(req,res) => {
    const items = await Item.find({});
    res.render('index', {items}); 
}

//add item form
exports.addItemForm = (req,res) => {
    res.render('new-item');
}

//add item
exports.addItem = async (req,res) => {
    const item = new Item(req.body);
    await item.save();

    console.log("Item created successfully:", item);
    res.redirect('/items');
}

//view specific item
exports.viewItem = async (req,res) => {
    const item = await Item.findById(req.params.id);
    res.render('show-item', {item});
}

//update item form
exports.editItemForm = async (req,res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit-item', {item});
}

//update item
// exports.updateItem = async (req, res) => {
//     const {id} = req.params;
//     const item = await Item.findByIdAndUpdate(id, {...req.body});
//     res.redirect(`/items/${id}`);
// }
exports.updateItem = async (req, res) => {
    const { id } = req.params;

    const existingItem = await Item.findById(id);
    if (!existingItem) {
        return res.status(404).send('Item not found');
    }

    const editedFields = {};

    for (const key in req.body) {
        if (existingItem[key] !== req.body[key]) {
            editedFields[key] = req.body[key];
        }
    }

    // Log the edited fields only if there are any changes
    if (Object.keys(editedFields).length > 0) {
        console.log("Edited fields:", editedFields);
        
        // Update the item in the database with only the edited fields
        await Item.findByIdAndUpdate(id, { $set: editedFields });
    } else {
        console.log("No fields were edited.");
    }

    res.redirect(`/items/${id}`);
}

// ... existing code ...

// delete confirmation form
exports.deleteConfirmation = async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.render('delete-item', { item });
}

//delete item
exports.deleteItem = async (req,res) => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    console.log("Item deleted successfully");
    res.redirect('/items');
}