// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Drink Model
const drinkModel = require("../models/drinkModel");

const getAllDrink = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model lấy dữ liệu
    drinkModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json(
            data
        )
    })
}

const createDrink = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const { maNuocUong,tenNuocUong,donGia} = request.body;
    // B2: Validate dữ liệu
    // Kiểm tra maNuocUong có hợp lệ hay không
    if (!maNuocUong) {
        return response.status(400).json({
            status: "Bad Request",
            message: "maNuocUong không hợp lệ"
        })
    }

    // Kiểm tra tên nước uống có hợp lệ hay không
    if (!tenNuocUong) {
        return response.status(400).json({
            status: "Bad Request",
            message: "tenNuocUong không hợp lệ"
        })
    }

    // Kiểm tra donGia có hợp lệ hay không
    if (isNaN(donGia) || donGia < 0) {
        return response.status(400).json({
            status: "Bad Request",
            message: "No Student không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const newDrink = {
        _id: mongoose.Types.ObjectId(),
        maNuocUong: maNuocUong,
        tenNuocUong: tenNuocUong,
        donGia: donGia
    }

    drinkModel.create(newDrink, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create Drink successfully",
            data: data
        })
    })
}

const getDrinkById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const drinkId = request.params.drinkId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    drinkModel.findById(drinkId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail Drink successfully",
            data: data
        })
    })
}

const updateDrinkById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const drinkId = request.params.drinkId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkID không hợp lệ"
        })
    }

    if (body.maNuocUong !== undefined && body.maNuocUong.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "maNuocUong không hợp lệ"
        })
    }

    if (body.tenNuocUong !== undefined && body.tenNuocUong.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "tenNuocUong không hợp lệ"
        })
    }

    if (body.donGia !== undefined && (isNaN(body.donGia) || body.donGia < 0)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "donGia không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateDrink = {}

    if (body.maNuocUong !== undefined) {
        updateDrink.maNuocUong = body.maNuocUong
    }

    if (body.tenNuocUong !== undefined) {
        updateDrink.tenNuocUong = body.tenNuocUong
    }

    if (body.donGia !== undefined) {
        updateDrink.donGia = body.donGia
    }

    drinkModel.findByIdAndUpdate(drinkId, updateDrink, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update Drink successfully",
            data: data
        })
    })
}

const deleteDrinkById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const drinkId = request.params.drinkId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    drinkModel.findByIdAndDelete(drinkId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete Drink successfully"
        })
    })
}

module.exports = {
    getAllDrink,
    createDrink,
    getDrinkById,
    updateDrinkById,
    deleteDrinkById
}