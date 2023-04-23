// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Order Model
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const drinkModel = require("../models/drinkModel");
const voucherModel = require("../models/voucherModel");


const getAllOrder = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    orderModel.find()
        .populate('user')
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

    // orderModel.find((error, data) => {
    //     if (error) {
    //         return response.status(500).json({
    //             status: "Internal server error",
    //             message: error.message
    //         })
    //     }
    //     return response.status(200).json({
    //         status: "Get all Order successfully",
    //         data: data
    //     })
    // })
}

const createOrder = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const { fullName, email, address, phone, pizzaSize, drink, pizzaType, loiNhan, voucher, duongKinh, suon, salad, soLuongNuoc, thanhTien } = request.body;
    const fields = ["fullName", "email", "address", "phone", "pizzaSize", "pizzaType", "drink"]

    console.log({ fullName, email, address, phone, pizzaSize, drink, pizzaType, loiNhan, voucher, duongKinh, suon, salad, soLuongNuoc, thanhTien })
    // Check isEmpty in input fields 
    for (const field of fields) {
        if (!request.body[field]) {
            console.log(field)
            return response.status(400).json({
                status: `Bad Request ${field}`,
                message: `${field} is required`
            });
        }
    }

    // B3: Gọi Model tạo dữ liệu user và order
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        pizzaSize, pizzaType, voucher, loiNhan,
        drink, duongKinh, suon, salad, soLuongNuoc, thanhTien, status:"Open"
    }
    const newUser = { fullName, email, address, phone }

    const condition = { email: email };
    userModel
        .findOne(condition)
        .exec((error, existUser) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error find ExistUser ",
                    message: error.message
                })
            } else {
                if (!existUser) {
                    // Nếu User không tồn tại
                    userModel.create(newUser, (errCreateUser, createdUser) => {
                        if (errCreateUser) {
                            return response.status(500).json({
                                status: "Internal server error: errCreateUser",
                                message: errCreateUser.message
                            });
                        } else {
                            newOrder.user = createdUser._id
                            orderModel.create(newOrder, (errCreateOrder, createdOrder) => {
                                if (errCreateOrder) {
                                    return response.status(500).json({
                                        status: "Internal server error: errCreateUser",
                                        message: errCreateUser.message
                                    });
                                } else {
                                    createdUser.orders.push(createdOrder._id);
                                    createdUser.save((err) => {
                                        if (err) {
                                            return response.status(500).json({
                                                status: "Internal server error updating createdUser",
                                                message: err.message
                                            });
                                        } else {
                                            return response.status(201).json({
                                                status: "Create Drink successfully",
                                                order: createdOrder,
                                                user: createdUser,
                                                orderCode: createdOrder.orderCode,
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    //Nếu user đã tồn tại
                    newOrder.user = existUser._id
                    orderModel.create(newOrder, (errCreateOrder, createdOrder) => {
                        if (errCreateOrder) {
                            return response.status(500).json({
                                status: "Internal server error errCreateOrder- ExistUser",
                                message: errCreateOrder.message
                            });
                        } else {
                            existUser.orders.push(createdOrder._id);
                            existUser.save((err) => {
                                if (err) {
                                    return response.status(500).json({
                                        status: "Internal server error updating existUser",
                                        message: err.message
                                    });
                                } else {
                                    return response.status(201).json({
                                        status: "Create order Success",
                                        order: createdOrder,
                                        user: existUser,
                                        orderCode: createdOrder.orderCode,
                                    });
                                }
                            });
                        }
                    });
                }
            }

        })
}

const getOrderById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const orderId = request.params.orderId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    orderModel.
        findById(orderId)
        .populate('user')
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            return response.status(200).json({
                status: "Get detail Order successfully",
                data: data
            })
        })
}

const updateOrderById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const orderId = request.params.orderId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderID không hợp lệ"
        })
    }


    if (body.orderCode !== undefined && body.orderCode.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderCode không hợp lệ"
        })
    }

    if (body.pizzaSize !== undefined && body.pizzaSize.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "pizzaSize không hợp lệ"
        })
    }

    if (body.voucher !== undefined && body.voucher.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucher không hợp lệ"
        })
    }

    if (body.drink !== undefined && body.drink.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderCode không hợp lệ"
        })
    }

    if (body.status !== undefined && body.status.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderCode không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateOrder = {}

    if (body.orderCode !== undefined) {
        updateOrder.orderCode = body.orderCode
    }
    if (body.pizzaSize !== undefined) {
        updateOrder.pizzaSize = body.pizzaSize
    }
    if (body.pizzaType !== undefined) {
        updateOrder.pizzaType = body.pizzaType
    }
    if (body.voucher !== undefined) {
        updateOrder.voucher = body.voucher
    }
    if (body.drink !== undefined) {
        updateOrder.drink = body.drink
    }
    if (body.status !== undefined) {
        updateOrder.status = body.status
    }

    orderModel.findByIdAndUpdate(orderId, updateOrder, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update Order successfully",
            data: data
        })
    })
}

const deleteOrderById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const orderId = request.params.orderId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    orderModel.findByIdAndDelete(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete Order successfully"
        })
    })
}


module.exports = {
    getAllOrder,
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById
}