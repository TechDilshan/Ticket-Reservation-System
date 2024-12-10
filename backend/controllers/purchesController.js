// controllers/userController.js
const purchesModel = require('../models/purchesModel');

const getPurches = (req, res) => {
    const purches = purchesModel.getAllPurches();
    res.json(purches);
};

const getPurch = (req, res) => {
    const purchesId = String(req.params.id);
    const purches = purchesModel.getPurchesById(purchesId);
    
    if (purches) {
        res.json(purches);
    } else {
        res.status(404).send('Purches not found');
    }
};

const createPurches = (req, res) => {
    const newPurches = req.body;
    purchesModel.createPurches(newPurches);
    res.status(201).json(newPurches);
};

const updatePurches = (req, res) => {
    const updatedPurches = req.body;
    const purchesId = Number(req.params.id);
    console.log('Updating user with ID:', purchesId);
    try {
        purchesModel.updatePurches(purchesId, updatedPurches);
        res.sendStatus(204);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const deletePurches = (req, res) => {
    const purchesId = Number(req.params.id);
    try {
        const purchesExists = purchesModel.getPurchesById(purchesId);
        if (!purchesExists) {
            return res.status(404).send('Purches not found');
        }
        purchesModel.deletePurches(purchesId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getTotalPurches = (req, res) => {
    const totalPurches = purchesModel.getTotalPurches();
    res.json({ total: totalPurches });
};

module.exports = {
    getPurches,
    getPurch,
    createPurches,
    updatePurches,
    deletePurches,
    getTotalPurches
};