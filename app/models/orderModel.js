// Khai báo thư viện mongo
const mongoose = require("mongoose")

const crypto = require("crypto")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance orderSchema 
const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderCode: {
        type: String,
        unique: true,
        default: () => {
            return crypto.randomBytes(64).toString('hex').substr(0, 6).toUpperCase();
        }
    },
    pizzaType: {
        type: String,
        required: true
    },
    loiNhan: {
        type: String,
        required: true
    },
    voucher: {
        type: String,
        ref: "Voucher"
    },
    drink: {
        type: String,
        ref: "Drink"
    },
    status: {
        type: String,
        required: true,
        default: "Open"
    },
    pizzaSize: {
        type: String,
        require: true
    },
    duongKinh: {
        type: Number,
        require: true
    },
    suon: {
        type: Number,
        require: true
    },
    salad: {
        type: Number,
        require: true
    },
    soLuongNuoc: {
        type: Number,
        require: true
    },
    thanhTien: {
        type: Number,
        require: true
    },
    discount:{
        type: Number,
        require: true
    },
}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("Order", orderSchema)