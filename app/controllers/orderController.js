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
    const useremail = request.query.useremail;
    const orderInfo = {
            fullname: body.hoTen,
            email: body.email,
            address: body.diaChi,
            fullname: body.loiNhan,
            phone: body.soDienThoai,
            pizzaSize: body.kichCo,
            drink: body.idLoaiNuocUong,
            pizzaType: body.loaiPizza,
            voucher: body.idVourcher
        }
        // orderCode: String, unique
        // pizzaSize: String, required
        // pizzaType: String, required
        // voucher: ObjectID, ref: Voucher
        // drink: ObjectID, ref: Drink
        // status: String, required

    // B2: Validate dữ liệu
    // Kiểm tra orderCode có hợp lệ hay không
    // if (!body.orderCode) {
    //     return response.status(400).json({
    //         status: "Bad Request",
    //         message: "orderCode không hợp lệ"
    //     })
    // }

    // Kiểm tra pizzaSize có hợp lệ hay không
    if (!body.pizzaSize) {
        return response.status(400).json({
            status: "Bad Request",
            message: "pizzaSize không hợp lệ"
        })
    }

    // Kiểm tra pizzaType có hợp lệ hay không
    if (!body.pizzaType) {
        return response.status(400).json({
            status: "Bad Request",
            message: "pizzaType không hợp lệ"
        })
    }

    // Kiểm tra voucher có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(body.voucher)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucher không hợp lệ"
        })
    }

    // Kiểm tra drink có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(body.drink)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drink không hợp lệ"
        })
    }


    // Kiểm tra status có hợp lệ hay không
    if (!body.status) {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderCode không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        // orderCode: body.orderCode,
        pizzaSize: body.pizzaSize,
        pizzaType: body.pizzaType,
        voucher: body.voucher,
        drink: body.drink,
        status: body.status
    }


    orderModel.create(newOrder, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create Order successfully",
            data: data
        })
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