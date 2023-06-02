const express = require('express');
const { UserController } = require('../../controllers');
const {AuthMiddleware} = require('../../middlewares')
const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/signin', AuthMiddleware.validateAuthRequest,valiUserController.signin);
module.exports = router;