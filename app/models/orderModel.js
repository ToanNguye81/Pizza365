// Khai báo thư viện mongo
const mongoose = require("mongoose")

const crypto = require("crypto")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance orderSchema 
const orderSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderCode: {
        type: String,
        unique: true,
        default: () => {
            return crypto.randomBytes(64);
        }
    },
    pizzaSize: {
        type: String,
        required: true,
    },
    pizzaType: {
        type: String,
        required: true
    },
    voucher: {
        type: mongoose.Types.ObjectId,
        ref: "Voucher"
    },
    drink: {
        type: mongoose.Types.ObjectId,
        ref: "Drink"
    },
    status: {
        type: String,
        required: true,
        default: "Open"
    }
}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("Order", orderSchema)