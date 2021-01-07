"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../model/user"));
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var user_2 = require("../controller/user");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
router.get("/get_all_user", isAuth_1.default, [], user_2.get_all_users);
router.post("/customer_signup", [
    express_validator_1.body("email")
        .notEmpty()
        .normalizeEmail()
        .isEmail()
        .custom(function (v) {
        return user_1.default.findOne({ email: v }).then(function (user) {
            if (user) {
                return Promise.reject("Email is already used.");
            }
            else {
                return Promise.resolve();
            }
        });
    }),
    express_validator_1.body("password").notEmpty().isStrongPassword(),
], user_2.signup_customer);
router.post("/supplier_signup", [
    express_validator_1.body("email")
        .notEmpty()
        .normalizeEmail()
        .isEmail()
        .custom(function (v) {
        return user_1.default.findOne({ email: v }).then(function (user) {
            if (user) {
                return Promise.reject("Email is already used.");
            }
            else {
                return Promise.resolve();
            }
        });
    }),
    express_validator_1.body("password").notEmpty().isStrongPassword(),
], user_2.signup_supplier);
router.post("/signin", [
    express_validator_1.body("email")
        .notEmpty()
        .normalizeEmail()
        .isEmail()
        .custom(function (v) {
        return user_1.default.findOne({ email: v }).then(function (user) {
            if (!user) {
                return Promise.reject("User does not exist.");
            }
            else {
                return Promise.resolve();
            }
        });
    }),
    express_validator_1.body("password").notEmpty().isStrongPassword(),
], user_2.login_user);
router.put("/edit_profile", isAuth_1.default, [
    express_validator_1.body("fullname").notEmpty().withMessage("Full name required"),
    express_validator_1.body("gender")
        .notEmpty()
        .withMessage("gender must not be empty e.g male,female,other"),
    express_validator_1.body("address1").notEmpty().withMessage("Address 1 must not be empty"),
    express_validator_1.body("address2").notEmpty().withMessage("Address 2 must not be empty"),
    express_validator_1.body("country").notEmpty().withMessage("Country must not be emptry"),
], user_2.edit_profile);
router.put("/edit_avatar", isAuth_1.default, [], user_2.edit_avatar);
router.delete("/delte_user", isAuth_1.default, [], user_2.delete_user);
router.get("/get_profile", isAuth_1.default, user_2.get_profile);
exports.default = router;
//# sourceMappingURL=user.js.map