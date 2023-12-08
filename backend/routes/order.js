var express = require("express");
var router = express.Router();
require("dotenv").config();
const orderController = require("../controllers/OrderController");

router.post("/place", orderController.createOrder);
router.delete("/cancel/:orderId", orderController.cancelOrder);
router.get("/totalOrdersCount", orderController.totalOrders);

module.exports = router;
