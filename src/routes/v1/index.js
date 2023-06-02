const express = require('express');
const userRoutes = require('./user-routes');
const { InfoController } = require('../../controllers');


const router = express.Router();

router.get('/info', InfoController.info);

router.use('/user', userRoutes);

module.exports = router;