// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import Voucher middleware
const voucherMiddleware = require("../middlewares/voucherMiddleware");

// Import course controller
const voucherController = require("../controllers/voucherController")

router.get("/vouchers", voucherMiddleware.getAllVoucherMiddleware, voucherController.getAllVoucher)

router.get("/voucher-detail/:voucherCode", voucherMiddleware.getAllVoucherMiddleware, voucherController.getVoucherByVoucherCode)

router.post("/vouchers", voucherMiddleware.createVoucherMiddleware, voucherController.createVoucher)

router.get("/vouchers/:voucherId", voucherMiddleware.getDetailVoucherMiddleware, voucherController.getVoucherById)

router.put("/vouchers/:voucherId", voucherMiddleware.updateVoucherMiddleware, voucherController.updateVoucherById)

router.delete("/vouchers/:voucherId", voucherMiddleware.deleteVoucherMiddleware, voucherController.deleteVoucherById)

module.exports = router;