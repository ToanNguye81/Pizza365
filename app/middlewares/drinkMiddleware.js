const getAllDrinkMiddleware = (request, response, next) => {
    console.log("Get ALL Drink Middleware");
    next();
}

const createDrinkMiddleware = (request, response, next) => {
    console.log("Create Drink Middleware");
    next();
}

const getDetailDrinkMiddleware = (request, response, next) => {
    console.log("Get Detail Drink Middleware");
    next();
}

const updateDrinkMiddleware = (request, response, next) => {
    console.log("Update Drink Middleware");
    next();
}

const deleteDrinkMiddleware = (request, response, next) => {
    console.log("Delete Drink Middleware");
    next();
}

module.exports = {
    getAllDrinkMiddleware,
    createDrinkMiddleware,
    getDetailDrinkMiddleware,
    updateDrinkMiddleware,
    deleteDrinkMiddleware
}