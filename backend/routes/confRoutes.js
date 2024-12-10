// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const confController = require('../controllers/confController');

router.get('/configuration', confController.getTickets);
router.get('/configuration/:id', confController.getTicket);
router.post('/createconfiguration', confController.createTicket);
router.put('/updateconfiguration/:id', confController.updateTicket);

module.exports = router;