"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var product_1 = require("../controller/product");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var router = express_1.Router();
router.get("/get_all_products", product_1.get_all_products);
router.get("/get_product", [express_validator_1.body("id").notEmpty().withMessage("Product Id required")], product_1.get_product);
router.get("/get_product_by_category", [express_validator_1.body("id").notEmpty().withMessage("Category Id required")], product_1.get_product_by_category);
router.get("/get_products_by_suppliers", isAuth_1.default, product_1.get_products_by_suppliers);
router.post("/create_product", isAuth_1.default, [
    express_validator_1.body("name").notEmpty().withMessage("Product name must not be empty"),
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("Product Description must not be empty"),
    express_validator_1.body("price").notEmpty().withMessage("Product price must not be empty"),
    express_validator_1.body("category_id").notEmpty().withMessage("Category Id must not be empty"),
], product_1.create_product);
router.put("/edit_product", isAuth_1.default, [
    express_validator_1.body("name").notEmpty().withMessage("Product name must not be empty"),
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("Product Description must not be empty"),
    express_validator_1.body("price").notEmpty().withMessage("Product price must not be empty"),
    express_validator_1.body("category_id").notEmpty().withMessage("Category Id must not be empty"),
    express_validator_1.body("id").notEmpty().withMessage("Product Id must not be empty"),
], product_1.edit_product);
router.delete("/delete_product", isAuth_1.default, [express_validator_1.body("id").notEmpty().withMessage("Product Id must not be empty")], product_1.delete_product);
exports.default = router;
//# sourceMappingURL=product.js.map