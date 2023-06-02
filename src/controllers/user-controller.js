const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createUser(req, res) {
    try {
        console.log(req.body);
        const user = await UserService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.message = "Successfully created a user";
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        console.log(error);
        ErrorResponse.message = "Error occured while creating user";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        console.log(req.body);
        const jwt = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        console.log("JWT ", jwt)
        SuccessResponse.message = "Successfully signed in";
        SuccessResponse.data = jwt;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        console.log(error);
        ErrorResponse.message = "Error occured while signing in";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createUser,
    signin
}
