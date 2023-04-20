// Khai báo thư viện Express
// Tương tự : import express from "express";
const express = require("express");

const path = require("path");

// khai báo mongoose 
var mongoose = require('mongoose');

// Khởi tạo Express App
const app = express();

// Cấu hình request đọc được body json
app.use(express.json());

// Khai báo để dử dụng UTF8
app.use(express.urlencoded({
    extended: true
}))

//Khai báo port sử dụng
const port = 8000;


app.use((request, response, next) => {
    console.log("Current time: ", new Date());
    next();
})

app.use((request, response, next) => {
    console.log("Request method: ", request.method);
    next();
})

// Kết nối với MongoDB:
mongoose.connect("mongodb://127.0.0.1:27017/CRUD_Pizza365", function(error) {
    if (error) throw error;
    console.log('Successfully MongoDB connected');
})

// Khai báo API /main thử nghiệm
app.get("/main", (request, response) => {
    console.log("Call API GET /");

    response.json({
        message: "Devcamp Middleware Express APP"
    })
})

// Khai báo router app
const drinkRouter = require("./app/routers/drinkRouter");
const voucherRouter = require("./app/routers/voucherRouter");
const orderRouter = require("./app/routers/orderRouter");
const userRouter = require("./app/routers/userRouter");

// Khai báo APi dạng Get "/pizza365" sẽ chạy vào đây
app.get("/", (request, response) => {
    console.log(__dirname);
    //Chạy file HTML với đường dẫn / cần dòng 2
    response.sendFile(path.join(__dirname + "/views/index.html"));

})

// App sử dụng router
app.use("/pizza365", drinkRouter);
app.use("/pizza365", voucherRouter);
app.use("/pizza365", orderRouter);
app.use("/pizza365", userRouter);

//Để hiển thị ảnh cần thêm middleware static vào express
app.use(express.static(__dirname + "/views"))


app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
})