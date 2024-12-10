// controllers/userController.js
const userModel = require('../models/userModel');

const getUsers = (req, res) => {
    const users = userModel.getAllUsers();
    res.json(users);
};

const getUser = (req, res) => {
    const userId = Number(req.params.id);
    const user = userModel.getUserById(userId);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

const createUser = (req, res) => {
    const newUser = req.body;
    userModel.createUser(newUser);
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const updatedUser = req.body;
    const userId = Number(req.params.id);
    console.log('Updating user with ID:', userId);
    try {
        userModel.updateUser(userId, updatedUser);
        res.sendStatus(204);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const deleteUser = (req, res) => {
    const userId = Number(req.params.id);
    try {
        const userExists = userModel.getUserById(userId);
        if (!userExists) {
            return res.status(404).send('User not found');
        }
        userModel.deleteUser(userId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};