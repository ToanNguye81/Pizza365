// Khai báo thư viện mongo
const mongoose = require("mongoose")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance drinkSchema 
const drinkSchema = new Schema({
    maNuocUong: {
        type: String,
        unique: true,
        required: true
    },
    tenNuocUong: {
        type: String,
        required: true,
    },
    donGia: {
        type: Number,
        required: true
    },
}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("Drink", drinkSchema)