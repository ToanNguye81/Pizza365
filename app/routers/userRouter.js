// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import user middleware
const userMiddleware = require("../middlewares/userMiddleware");

// Import course controller
const userController = require("../controllers/userController")

router.get("/users", userMiddleware.getAllUserMiddleware, userController.getAllUser)

router.get("/users/limit-users", userMiddleware.getLimitUserMiddleware, userController.getLimitUser)

router.get("/users/sort-users", userMiddleware.getSortUserMiddleware, userController.getSortUser)

router.get("/users/skip-users", userMiddleware.getSkipUserMiddleware, userController.getSkipUser)

router.get("/users/skip-limit-users", userMiddleware.getSkipLimitUserMiddleware, userController.getSkipLimitUser)

router.get("/users/sort-skip-limit-users", userMiddleware.getSortSkipLimitUserMiddleware, userController.getSortSkipLimitUser)

router.post("/users", userMiddleware.createUserMiddleware, userController.createUser)

router.get("/users/:userId", userMiddleware.getDetailUserMiddleware, userController.getUserById)

router.put("/users/:userId", userMiddleware.updateUserMiddleware, userController.updateUserById)

router.delete("/users/:userId", userMiddleware.deleteUserMiddleware, userController.deleteUserById)

module.exports = router;