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
    orderModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all Order successfully",
            data: data
        })
    })
}

const createOrder = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    // Sử dụng email để tìm kiếm
    const fullName = body.hoTen;
    const email = body.email;
    const address = body.diaChi;
    const phone = body.soDienThoai;
    const pizzaSize = body.kichCo;
    const drink = body.idLoaiNuocUong; // Lúc này truyền vào là ObjectId
    const pizzaType = body.loaiPizza;
    const voucher = body.idVourcher; // Lúc này truyền vào là idVoucher
    // const status = body.status;

    // orderCode: String, unique
    // pizzaSize: String, required
    // pizzaType: String, required
    // voucher: ObjectID, ref: Voucher
    // drink: ObjectID, ref: Drink
    // status: String, required

    // B2: Validate dữ liệu
    // Kiểm tra orderCode có hợp lệ hay không
    // if (orderCode) {
    //     return response.status(400).json({
    //         status: "Bad Request",
    //         message: "orderCode không hợp lệ"
    //     })
    // }

    // Kiểm tra pizzaSize có hợp lệ hay không
    if (!fullName) {
        return response.status(400).json({
            status: "Bad Request",
            message: "hoTen không hợp lệ crearte"
        })
    }

    if (!email) {
        return response.status(400).json({
            status: "Bad Request",
            message: "email không hợp lệ"
        })
    }

    if (!address) {
        return response.status(400).json({
            status: "Bad Request",
            message: "địa chỉ không hợp lệ"
        })
    }

    if (!phone || isNaN(phone)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "số điện thoại không hợp lệ"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(drink)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "DrinkId không hợp lệ"
        })
    }

    // Kiểm tra pizzaType có hợp lệ hay không
    if (!pizzaType) {
        return response.status(400).json({
            status: "Bad Request",
            message: "pizzaType không hợp lệ"
        })
    }

    // Kiểm tra pizzaType có hợp lệ hay không
    if (!pizzaSize) {
        return response.status(400).json({
            status: "Bad Request",
            message: "pizzaSize không hợp lệ"
        })
    }

    // Kiểm tra voucher có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(voucher)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }



    // B3: Gọi Model tạo dữ liệu user và order
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        pizzaSize: pizzaSize,
        pizzaType: pizzaType,
        voucher: voucher,
        drink: drink
    }

    const newUser = {
        fullName: fullName,
        email: email,
        address: address,
        phone: phone
    }

    console.log(newUser)
    console.log(newOrder)

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
                            })
                        } else {
                            orderModel.create(newOrder, (errCreateOrder, createdOrder) => {
                                if (errCreateOrder) {
                                    return response.status(500).json({
                                        status: "Internal server error: errCreateUser",
                                        message: errCreateUser.message
                                    })
                                } else {
                                    createdUser.orders.push(createdOrder._id)
                                    return response.status(201).json({
                                        status: "Create Drink successfully",
                                        data: createdOrder
                                    })
                                }


                            })
                        }
                    })
                } else {
                    //Nếu user đã tồn tại
                    orderModel.create(newOrder, (errCreateOrder, createdOrder) => {
                        if (errCreateOrder) {
                            return response.status(500).json({
                                status: "Internal server error errCreateOrder- ExistUser",
                                message: errCreateOrder.message
                            })
                        } else {
                            existUser.orders.push(createdOrder._id)
                            console.log("createdOrder Succesfully")
                            return response.status(201).json({
                                status: "Internal server error",
                                order: createdOrder,
                                user: existUser,
                                orderCode: createdOrder.orderCode,
                            })
                        }
                    })

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
    orderModel.findById(orderId, (error, data) => {
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