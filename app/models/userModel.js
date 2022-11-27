const mongoose = require("mongoose")

const Schema = mongoose.Schema

//Khởi tạo instance reviewSchema 
const userSchenma = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    orders: [{
        // Array[ObjectId],
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }],

}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("User", userSchenma)