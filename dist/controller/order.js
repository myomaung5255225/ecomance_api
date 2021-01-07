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
exports.update_order = exports.create_order = exports.get_order_by_product = exports.get_order_by_user = void 0;
var express_validator_1 = require("express-validator");
var oreder_1 = __importDefault(require("../model/oreder"));
var product_1 = __importDefault(require("../model/product"));
var get_order_by_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error, order, error, error, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(req.userRole === "system_admin")) return [3 /*break*/, 2];
                return [4 /*yield*/, oreder_1.default.find()];
            case 1:
                order = _a.sent();
                if (order) {
                    res.status(200).json({
                        Data: order,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Orders not found!");
                    error.statusCode = 404;
                    throw error;
                }
                _a.label = 2;
            case 2:
                if (!(req.userRole === "customer")) return [3 /*break*/, 4];
                return [4 /*yield*/, oreder_1.default.find({ user: req.userId })];
            case 3:
                order = _a.sent();
                if (order) {
                    res.status(200).json({
                        Data: order,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Orders not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 5];
            case 4:
                error = new Error("You does have permission to view all oreders");
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
exports.get_order_by_user = get_order_by_user;
var get_order_by_product = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, product, error, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(req.userRole === "system_admin" || "supplier")) return [3 /*break*/, 2];
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation Failed");
                    error.statusCode = 422;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, product_1.default.findById(req.body.product_id).populate("order")];
            case 1:
                product = _a.sent();
                if (product) {
                    res.status(200).json({
                        Data: product.order,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("Product not Found.");
                    error.statusCode = 401;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error = new Error("You does not have permission to view those orders.");
                error.statusCode = 401;
                throw error;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                if (!error_2.statusCode) {
                    error_2.statusCode = 500;
                }
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.get_order_by_product = get_order_by_product;
var create_order = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, create_order_1, order, result, product, final_result, error, error, error, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!(req.userRole === "customer")) return [3 /*break*/, 5];
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                create_order_1 = {
                    product: req.body.product_id,
                    remark: req.body.remark,
                    user: req.userId,
                };
                order = new oreder_1.default(create_order_1);
                return [4 /*yield*/, order.save()];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, product_1.default.findById(req.body.product_id)];
            case 2:
                product = _a.sent();
                if (product) {
                    product.order.push(result.id);
                    final_result = product.save();
                    if (final_result) {
                        res.status(201).json({
                            Data: result,
                            status: 1,
                            message: "Order created successfully!",
                        });
                    }
                    else {
                        error = new Error("Order fail");
                        error.statusCode = 422;
                        throw error;
                    }
                }
                else {
                    error = new Error("Product not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("Order fail");
                error.statusCode = 422;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error = new Error("You does not need to order for this product");
                error.statusCode = 401;
                throw error;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                if (!error_3.statusCode) {
                    error_3.statusCode = 500;
                }
                next(error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.create_order = create_order;
var update_order = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, is_own, order, order_result, error, error, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                if (!(req.userRole === "supplier")) return [3 /*break*/, 7];
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, product_1.default.findById(req.body.product_id).where({
                        supplier: req.userId,
                    })];
            case 1:
                is_own = _a.sent();
                if (!is_own) return [3 /*break*/, 6];
                return [4 /*yield*/, oreder_1.default.findById(req.body.order_id).where({
                        product: req.body.product_id,
                    })];
            case 2:
                order = _a.sent();
                if (!order) return [3 /*break*/, 4];
                order.status = req.body.order_status;
                return [4 /*yield*/, order.save()];
            case 3:
                order_result = _a.sent();
                if (order_result) {
                    res.status(201).json({
                        Data: order_result,
                        status: 1,
                        message: "Order updated successfully!",
                    });
                }
                else {
                    error = new Error("Order updated fail");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 5];
            case 4:
                error = new Error("You does have permission to update this order");
                error.statusCode = 401;
                throw error;
            case 5: return [3 /*break*/, 7];
            case 6:
                error = new Error("You does have permission to update this order");
                error.statusCode = 401;
                throw error;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_4 = _a.sent();
                if (!error_4.statusCode) {
                    error_4.statusCode = 500;
                }
                next(error_4);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.update_order = update_order;
//# sourceMappingURL=order.js.map