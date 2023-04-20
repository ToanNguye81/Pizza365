// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module User Model
const userModel = require("../models/userModel");

const getAllUser = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    userModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all User successfully",
            data: data
        })
    })
}

const createUser = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    // B2: Validate dữ liệu
    // Kiểm tra fullName có hợp lệ hay không
    if (!body.fullName) {
        return response.status(400).json({
            status: "Bad Request",
            message: "fullName không hợp lệ"
        })
    }

    //Kiểm tra email có hợp lệ không
    if (!body.email) {
        return response.status(400).json({
            status: "Bad Request",
            message: "email không hợp lệ"
        })
    }

    //Kiểm tra address có hợp lệ không
    if (!body.address) {
        return response.status(400).json({
            status: "Bad Request",
            message: "address không hợp lệ"
        })
    }

    //Kiểm tra phone có hợp lệ không
    if (!body.phone) {
        return response.status(400).json({
            status: "Bad Request",
            message: "phone không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const newUser = {
        _id: mongoose.Types.ObjectId(),
        fullName: body.fullName,
        email: body.email,
        address: body.address,
        phone: body.phone,
        orders: body.orders,
    }

    userModel.create(newUser, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create User successfully",
            data: data
        })
    })
}

const getUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    userModel.findById(userId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail User successfully",
            data: data
        })
    })
}

const updateUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    if (body.fullName !== undefined && body.fullName.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "fullName không hợp lệ"
        })
    }

    if (body.email !== undefined && body.email.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "email không hợp lệ"
        })
    }

    if (body.address !== undefined && body.address.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "address không hợp lệ"
        })
    }

    if (body.phone !== undefined && body.phone.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "phone không hợp lệ"
        })
    }

    if (body.orders !== undefined && body.orders.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "orders không hợp lệ"
        })
    }

    // B3: Gọi Model update dữ liệu
    const updateUser = {}

    if (body.fullName !== undefined) {
        updateUser.fullName = body.fullName
    }

    if (body.email !== undefined) {
        updateUser.email = body.email
    }

    if (body.address !== undefined) {
        updateUser.address = body.address
    }

    if (body.phone !== undefined) {
        updateUser.phone = body.phone
    }

    if (body.orders !== undefined) {
        updateUser.orders = body.orders
    }

    userModel.findByIdAndUpdate(userId, updateUser, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update User successfully",
            data: data
        })
    })
}

const deleteUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    userModel.findByIdAndDelete(userId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete User successfully"
        })
    })
}

const getLimitUser = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let limitUser = request.query.limitUser;
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    userModel.find()
        .limit(limitUser)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Limit User success",
                    data: data
                })
            }
        });
}

const getSkipUser = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let skipUser = request.query.skipUser;
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    userModel.find()
        .skip(skipUser)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Skip USer success",
                    data: data
                })
            }
        });
}

const getSortUser = (request, response) => {
    //B1: Chuẩn bị dữ liệu

    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    userModel.find()
        .sort({ fullName: 'asc' })
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Sort asc USer success",
                    data: data
                })
            }
        });
}

const getSkipLimitUser = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    //thu thập dữ liệu trên front-end
    let skipUser = request.query.skipUser;
    let limitUser = request.query.limitUser;

    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    userModel.find()
        .skip(skipUser)
        .limit(limitUser)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Sort asc USer success",
                    data: data
                })
            }
        });
}

const getSortSkipLimitUser = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    //thu thập dữ liệu trên front-end
    let skipUser = request.query.skipUser;
    let limitUser = request.query.limitUser;

    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    userModel.find()
        .sort({ fullName: 'asc' })
        .skip(skipUser)
        .limit(limitUser)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Sort asc USer success",
                    data: data
                })
            }
        });

}


module.exports = {
    getAllUser,
    getSkipLimitUser,
    getLimitUser,
    getSortSkipLimitUser,
    getSortUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getSkipUser
}