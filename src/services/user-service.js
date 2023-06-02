const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const bcrypt = require('bcrypt');
const {Auth} = require('../utils/common')

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const newUser = userRepository.create(data);
        return newUser;
    }
    catch(error) {
        throw new AppError("Error in creating new user", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        console.log("Reaced serv", data)
        const user = await userRepository.getUserByEmail(data.email);
        if(!user) {
            throw new AppError("No User found for given email", StatusCodes.NOT_FOUND);
        }
        const passwordMatched = await Auth.checkPassword(data.password, user.password);
        if(!passwordMatched) {
            throw new AppError("Wrong password", StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.email});
        console.log("JWT from serv: ", jwt)
        return jwt;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    signin
}