// models/userModel.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/userdata.json');

const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllUsers = () => {
    const data = readData();
    return data.users;
};

const getUserById = (id) => {
    const data = readData();
    return data.users.find(user => user.id === id);
};

const createUser = (user) => {
    const data = readData();
    
    // Determine the next user ID
    const maxId = data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) : 0;
    const newUserId = maxId + 1; // Increment max ID by 1

    // Create the new user object with the new ID
    const newUser = {
        id: newUserId, // Assign the new ID
        name: user.name,
        email: user.email,
        number: user.number,
        password: user.password,
        type: user.type,
    };

    data.users.push(newUser);
    writeData(data);
};

const updateUser = (id, updatedUser) => {
    const data = readData();
    const index = data.users.findIndex(user => user.id === id);
    
    // Check if the user exists
    if (index === -1) {
        throw new Error(`User with ID ${id} not found.`);
    }

    // Check if updatedUser is valid
    if (!updatedUser || typeof updatedUser !== 'object') {
        throw new Error('Invalid user data provided for update.');
    }

    data.users[index] = { ...data.users[index], ...updatedUser };
    writeData(data);
};

const deleteUser = (id) => {
    const data = readData();
    const filteredUsers = data.users.filter(user => user.id !== id);
    writeData({ users: filteredUsers });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};