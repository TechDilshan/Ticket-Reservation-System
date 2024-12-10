// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const purchesController = require('../controllers/purchesController');

router.get('/purches', purchesController.getPurches);
router.get('/purches/:id', purchesController.getPurch);
router.post('/createpurches', purchesController.createPurches);
router.put('/updatepurches/:id', purchesController.updatePurches);
router.delete('/deletepurches/:id', purchesController.deletePurches);
router.get('/total-purches', purchesController.getTotalPurches);

module.exports = router;
