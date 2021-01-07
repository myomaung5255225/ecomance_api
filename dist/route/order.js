"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var order_1 = require("../controller/order");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var router = express_1.Router();
router.post("/create_order", isAuth_1.default, [
    express_validator_1.body("product_id").notEmpty().withMessage("Product Id must not be empty"),
    express_validator_1.body("remark").notEmpty().withMessage("Remark must not be empty"),
], order_1.create_order);
router.get("/get_order_by_user", isAuth_1.default, order_1.get_order_by_user);
router.get("/get_order_by_product", isAuth_1.default, [express_validator_1.body("product_id").notEmpty().withMessage("Product Id must not be empty")], order_1.get_order_by_product);
router.put("/update_order", isAuth_1.default, [
    express_validator_1.body("product_id").notEmpty().withMessage("Product Id must not be empty"),
    express_validator_1.body("order_id").notEmpty().withMessage("Order Id must not be empty"),
    express_validator_1.body("status")
        .notEmpty()
        .withMessage("Status must not be empty e.g true or false"),
], order_1.update_order);
exports.default = router;
//# sourceMappingURL=order.js.map