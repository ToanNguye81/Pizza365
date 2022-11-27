const getAllVoucherMiddleware = (request, response, next) => {
    console.log("Get ALL Voucher Middleware");
    next();
}

const createVoucherMiddleware = (request, response, next) => {
    console.log("Create Voucher Middleware");
    next();
}

const getDetailVoucherMiddleware = (request, response, next) => {
    console.log("Get Detail Voucher Middleware");
    next();
}

const updateVoucherMiddleware = (request, response, next) => {
    console.log("Update Voucher Middleware");
    next();
}

const deleteVoucherMiddleware = (request, response, next) => {
    console.log("Delete Voucher Middleware");
    next();
}

module.exports = {
    getAllVoucherMiddleware,
    createVoucherMiddleware,
    getDetailVoucherMiddleware,
    updateVoucherMiddleware,
    deleteVoucherMiddleware
}