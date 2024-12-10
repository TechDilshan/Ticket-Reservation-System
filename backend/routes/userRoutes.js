// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/createusers', userController.createUser);
router.put('/updateusers/:id', userController.updateUser);
router.delete('/deleteusers/:id', userController.deleteUser);

module.exports = router;