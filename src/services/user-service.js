const { UserRepository } = require('../repositories');

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

module.exports = {
    createUser
}