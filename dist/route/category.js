"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var category_1 = require("../controller/category");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var category_2 = __importDefault(require("../model/category"));
var router = express_1.Router();
router.get("/all_categories", category_1.get_all_categories);
router.get("/get_category", [express_validator_1.body("id").notEmpty().withMessage("category_id must not be empty")], category_1.get_categroy);
router.post("/create_category", isAuth_1.default, [
    express_validator_1.body("name")
        .notEmpty()
        .custom(function (v) {
        return category_2.default.findOne({ name: v }).then(function (category) {
            if (category) {
                return Promise.reject("This category is already added.");
            }
            else {
                return Promise.resolve();
            }
        });
    }),
], category_1.create_category);
router.put("/edit_category", isAuth_1.default, [
    express_validator_1.body("id").notEmpty().withMessage("category_id must not be empty"),
    express_validator_1.body("name").notEmpty().withMessage("Category name must not be empty"),
], category_1.edit_category);
router.delete("/delete_category", isAuth_1.default, [express_validator_1.body("id").notEmpty().withMessage("category_id must not be empty")], category_1.delete_category);
exports.default = router;
//# sourceMappingURL=category.js.map