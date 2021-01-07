"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_product = exports.edit_product = exports.get_products_by_suppliers = exports.get_product = exports.get_product_by_category = exports.get_all_products = exports.create_product = void 0;
var express_validator_1 = require("express-validator");
var product_1 = __importDefault(require("../model/product"));
var create_product = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, create_product_1, product, result, error, error, error, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(req.userRole === "supplier" || "system_admin")) return [3 /*break*/, 4];
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.data = errors.array();
                    error.statusCode = 442;
                    throw error;
                }
                if (!req.file) return [3 /*break*/, 2];
                create_product_1 = {
                    name: req.body.name,
                    description: req.body.description,
                    img: req.file.path,
                    price: req.body.price,
                    category: req.body.category_id,
                    supplier: req.userId,
                };
                product = new product_1.default(create_product_1);
                return [4 /*yield*/, product.save()];
            case 1:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "Product create successfully",
                    });
                }
                else {
                    error = new Error("Product create fail");
                    error.statusCode = 442;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error = new Error("Please select product image");
                error.statusCode = 442;
                throw error;
            case 3: return [3 /*break*/, 5];
            case 4:
                error = new Error("You does not have permission to create product");
                error.statusCode = 401;
                throw error;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                if (!error_1.statusCode) {
                    error_1.statusCode = 500;
                }
                next(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.create_product = create_product;
var get_all_products = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.find().sort({ updatedAt: "desc" })];
            case 1:
                products = _a.sent();
                if (products) {
                    res.status(200).json({
                        Data: products,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Products not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (!error_2.statusCode) {
                    error_2.statusCode = 500;
                }
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_all_products = get_all_products;
var get_product_by_category = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, products, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 442;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, product_1.default.find()
                        .sort({ updatedAt: "desc" })
                        .where({ category: req.body.id })];
            case 1:
                products = _a.sent();
                if (products) {
                    res.status(200).json({
                        Data: products,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Products not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (!error_3.statusCode) {
                    error_3.statusCode = 500;
                }
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_product_by_category = get_product_by_category;
var get_product = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, product, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 442;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, product_1.default.findById(req.body.id)];
            case 1:
                product = _a.sent();
                if (product) {
                    res.status(200).json({
                        Data: product,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Product not found!");
                    error.statusCode = 442;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (!error_4.statusCode) {
                    error_4.statusCode = 500;
                }
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_product = get_product;
//for suppliers
var get_products_by_suppliers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.find().where({ supplier: req.userId })];
            case 1:
                products = _a.sent();
                if (products) {
                    res.status(200).json({
                        Data: products,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Products not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                if (!error_5.statusCode) {
                    error_5.statusCode = 500;
                }
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_products_by_suppliers = get_products_by_suppliers;
var edit_product = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, product, result, error, error, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Valation failed");
                    error.statusCode = 442;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, product_1.default.findById(req.body.id).where({
                        supplier: req.userId,
                    })];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 3];
                if (req.file) {
                    product.img = req.file.path;
                    product.name = req.body.name;
                    product.price = req.body.price;
                    product.category = req.body.category_id;
                    product.descrption = req.body.descrption;
                }
                else {
                    product.name = req.body.name;
                    product.price = req.body.price;
                    product.category = req.body.category_id;
                    product.descrption = req.body.descrption;
                }
                return [4 /*yield*/, product.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "Product updated successfully",
                    });
                }
                else {
                    error = new Error("Product edit fail");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("You does not have permission to edit this product");
                error.statusCode = 401;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                if (!error_6.statusCode) {
                    error_6.statusCode = 500;
                }
                next(error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.edit_product = edit_product;
//delete product
var delete_product = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, product, error, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 442;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, product_1.default.findByIdAndDelete(req.body.id).where({
                        supplier: req.userId,
                    })];
            case 1:
                product = _a.sent();
                if (product) {
                    res.status(200).json({
                        Data: product,
                        status: 1,
                        message: "Product deleted successfully",
                    });
                }
                else {
                    error = new Error("You does not have permission to delete this product");
                    error.statusCode = 401;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                if (!error_7.statusCode) {
                    error_7.statusCode = 500;
                }
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_product = delete_product;
//# sourceMappingURL=product.js.map