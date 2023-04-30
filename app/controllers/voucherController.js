// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Voucher Model
const voucherModel = require("../models/voucherModel");

const getAllVoucher = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    voucherModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all Voucher successfully",
            data: data
        })
    })
}

const createVoucher = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    console.log({ body })

    // B2: Validate dữ liệu

    if (!body.voucherCode) {
        return response.status(400).json({
            status: "Bad request",
            message: "Mã voucher không hợp lệ"
        })
    }
    if (isNaN(body.discount) || body.discount < 0) {
        return response.status(400).json({
            status: "Bad request",
            message: "Phần trăm giảm giá không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    // Create voucher
    const newVoucher = {
        _id: mongoose.Types.ObjectId(),
        voucherCode: body.voucherCode,
        discount: body.discount,
        ghiChu: body.ghiChu
    };
    voucherModel.create(newVoucher, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "Create new voucher successfully",
            data: data
        })
    })

}

const getVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherModel.findById(voucherId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail Voucher successfully",
            data: data
        })
    })
}

const getVoucherByVoucherCode = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const { voucherCode } = request.params;
    console.log(voucherCode)

    // B2: Validate dữ liệu
    if (voucherCode.trim() == "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Voucher code is empty"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherModel.findOne({ voucherCode: voucherCode }, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail Voucher successfully",
            data: data
        })
    })
}


const updateVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }

    if (!body.voucherCode) {
        return response.status(400).json({
            status: "Bad request",
            message: "Mã voucher không hợp lệ"
        })
    }

    if (isNaN(body.discount) || body.discount < 0) {
        return response.status(400).json({
            status: "Bad request",
            message: "Phần trăm giảm giá không hợp lệ"
        })
    }



    // B3: Gọi Model tạo dữ liệu
    const updateVoucher = {}

    if (body.voucherCode !== undefined) {
        updateVoucher.voucherCode = body.voucherCode
    }
    if (body.discount !== undefined) {
        updateVoucher.discount = body.discount
    }
    if (body.ghiChu !== undefined) {
        updateVoucher.ghiChu = body.ghiChu
    }


    voucherModel.findByIdAndUpdate(voucherId, updateVoucher, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update Voucher successfully",
            data: data
        })
    })
}

const deleteVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherModel.findByIdAndDelete(voucherId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete Voucher successfully"
        })
    })
}

module.exports = {
    getAllVoucher,
    createVoucher,
    getVoucherByVoucherCode,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
}