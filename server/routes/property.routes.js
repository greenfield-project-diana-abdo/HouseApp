const express = require('express');
const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/property.controller'); 
const verifyToken = require('../middleware/auth'); 
const router = express.Router();


router.post('/', verifyToken, createProperty); 
router.get('/', getProperties); 
router.get('/:id', getPropertyById); 
router.put('/:id', verifyToken, updateProperty); 
router.delete('/:id', verifyToken, deleteProperty); 

module.exports = router;