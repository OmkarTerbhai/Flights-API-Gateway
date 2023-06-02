const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateAuthRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.message = "Email is mandatory";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    validateAuthRequest
}