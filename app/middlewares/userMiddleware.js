const getAllUserMiddleware = (request, response, next) => {
    console.log("Get ALL User Middleware");
    next();
}

const createUserMiddleware = (request, response, next) => {
    console.log("Create User Middleware");
    next();
}

const getDetailUserMiddleware = (request, response, next) => {
    console.log("Get Detail User Middleware");
    next();
}

const updateUserMiddleware = (request, response, next) => {
    console.log("Update User Middleware");
    next();
}

const deleteUserMiddleware = (request, response, next) => {
    console.log("Delete User Middleware");
    next();
}

const getLimitUserMiddleware = (request, response, next) => {
    console.log("Get Limit User Middleware");
    next();
}

const getSkipUserMiddleware = (request, response, next) => {
    console.log("Get Skip User Middleware");
    next();
}
const getSortUserMiddleware = (request, response, next) => {
    console.log("Get Sort User Middleware");
    next();
}
const getSkipLimitUserMiddleware = (request, response, next) => {
    console.log("Get Skip Limit Middleware");
    next();
}

const getSortSkipLimitUserMiddleware = (request, response, next) => {
    console.log("Get Sort Skip Limit Middleware");
    next();
}


module.exports = {
    getAllUserMiddleware,
    getSortSkipLimitUserMiddleware,
    getSkipLimitUserMiddleware,
    getSkipUserMiddleware,
    getSortUserMiddleware,
    getLimitUserMiddleware,
    createUserMiddleware,
    getDetailUserMiddleware,
    updateUserMiddleware,
    deleteUserMiddleware
}