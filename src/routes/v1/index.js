const express = require('express');
const userRoutes = require('./user-routes');
const { InfoController } = require('../../controllers');

const {AuthMiddleware} = require('../../middlewares')
const router = express.Router();

router.get('/info', AuthMiddleware.checkAuth, InfoController.info);

router.use('/user', userRoutes);

module.exports = router;