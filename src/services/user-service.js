const { StatusCodes } = require('http-status-codes');
const { UserRepository, RoleRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const bcrypt = require('bcrypt');
const {Enums} = require('../utils/common')
const {Auth} = require('../utils/common');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {
    try {
        const newUser = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(Enums.USER_ENUMS.CUSTOMER);
        console.log("User: ", newUser);
        console.log(role);
        //Allocate user with customer role by default
        newUser.addRole(role);
        return newUser;

    }
    catch(error) {
        console.log(error)
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

async function isAuthenticated(token) {
    try {
        console.log("In Serv", token);
        if(!token) {
            throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        console.log("Res id", response.id);
        const user = await userRepository.get(response.id);
        console.log(user);
        if(!user) {
            throw new AppError("No user found", StatusCodes.BAD_REQUEST);
        }
        return user.id;
    } catch (error) {
        if(error.name == 'JsonWebTokenError') {
            throw new AppError("Invalid JSON token", StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}

module.exports = {
    createUser,
    signin,
    isAuthenticated
}