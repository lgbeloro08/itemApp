const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
//where all routes will be defined

router.get('/', itemController.items); 

//creating new item
router.get('/new-item', itemController.addItemForm);
router.post('/create-item', itemController.addItem);

//viewing specific item details
router.get('/:id', itemController.viewItem);

//updating item details
router.get('/:id/edit', itemController.editItemForm);
router.put('/:id', itemController.updateItem);

//item deletion
router.get('/:id/delete', itemController.deleteConfirmation);
router.delete('/:id', itemController.deleteItem);

module.exports = router;