const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const {UserService} = require('../services')

function validateAuthRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.message = "Email is mandatory";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        console.log("In AUTH Middleware")
        const isAuthenticated = await UserService.isAuthenticated(req.headers['x-access-token']);
        console.log(isAuthenticated);
        if(isAuthenticated) {
            req.user = isAuthenticated;
            next();
        }
    }
    catch(error) {
        return res.status(StatusCodes.BAD_REQUEST)
                    .json(error);
    }
}

async function isAdmin(req, res, next) {
    try {
        console.log("User from middleware ", req.user);
        const response = await UserService.isAdmin(req.user.id);
        if(!response) {
            return res.status(StatusCodes.UNAUTHORIZED)
                    .json({message: "Not Authorized"});
        }
        next();

    }
    catch(error) {

    }
}

module.exports = {
    validateAuthRequest,
    checkAuth,
    isAdmin
}