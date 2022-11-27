// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import drink middleware
const drinkMiddleware = require("../middlewares/drinkMiddleware");

// Import course controller
const drinkController = require("../controllers/drinkController")

router.get("/drinks", drinkMiddleware.getAllDrinkMiddleware, drinkController.getAllDrink)

router.post("/drinks", drinkMiddleware.createDrinkMiddleware, drinkController.createDrink)

router.get("/drinks/:drinkId", drinkMiddleware.getDetailDrinkMiddleware, drinkController.getDrinkById)

router.put("/drinks/:drinkId", drinkMiddleware.updateDrinkMiddleware, drinkController.updateDrinkById)

router.delete("/drinks/:drinkId", drinkMiddleware.deleteDrinkMiddleware, drinkController.deleteDrinkById)

module.exports = router;