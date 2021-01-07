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
exports.delete_user = exports.get_all_users = exports.edit_avatar = exports.edit_profile = exports.get_profile = exports.login_user = exports.signup_supplier = exports.signup_customer = void 0;
var express_validator_1 = require("express-validator");
var user_1 = __importDefault(require("../model/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var signup_customer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, password, newuser, user, result, token, error, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 422;
                    error.data = errors.array();
                    throw error;
                }
                password = bcrypt_1.default.hashSync(req.body.password, 12);
                newuser = {
                    email: req.body.email,
                    password: password,
                };
                user = new user_1.default(newuser);
                return [4 /*yield*/, user.save()];
            case 1:
                result = _a.sent();
                if (result) {
                    token = jsonwebtoken_1.default.sign({ userId: result.id, userRole: result.role }, process.env.SECRET || "secret", { expiresIn: "1d" });
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "New customer created successfully!",
                        access_token: token,
                    });
                }
                else {
                    error = new Error("Register fail");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (!error_1.statusCode) {
                    error_1.statusCode = 500;
                }
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signup_customer = signup_customer;
//signup supplier
var signup_supplier = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, password, newuser, user, result, token, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 422;
                    error.data = errors.array();
                    throw error;
                }
                password = bcrypt_1.default.hashSync(req.body.password, 12);
                newuser = {
                    email: req.body.email,
                    password: password,
                    role: "supplier",
                };
                user = new user_1.default(newuser);
                return [4 /*yield*/, user.save()];
            case 1:
                result = _a.sent();
                if (result) {
                    token = jsonwebtoken_1.default.sign({ userId: result.id, userRole: result.role }, process.env.SECRET || "secret", { expiresIn: "1d" });
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "New supplier created successfully!",
                        access_token: token,
                    });
                }
                else {
                    error = new Error("Register fail");
                    error.statusCode = 422;
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
exports.signup_supplier = signup_supplier;
//login_user
var login_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, is_user, is_password_correct, token, error, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.statusCode = 422;
                    error.data = errors.array();
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
            case 1:
                is_user = _a.sent();
                if (is_user) {
                    is_password_correct = bcrypt_1.default.compareSync(req.body.password, is_user.password);
                    if (is_password_correct) {
                        token = jsonwebtoken_1.default.sign({ userId: is_user.id, userRole: is_user.role }, process.env.SECRET || "secret", { expiresIn: "1d" });
                        res.status(200).json({
                            Data: is_user,
                            status: 1,
                            message: "login successful",
                            access_token: token,
                        });
                    }
                    else {
                        error = new Error("Password not match!");
                        error.statusCode = 404;
                        throw error;
                    }
                }
                else {
                    error = new Error("User does not exist!");
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
exports.login_user = login_user;
//get_profile
var get_profile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({
                        Data: user,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("User does not found!");
                    error.statusCode = 404;
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
exports.get_profile = get_profile;
var edit_profile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, result, error, error, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.profile.fullname = req.body.fullname;
                user.profile.gender = req.body.gender;
                user.profile.address1 = req.body.address1;
                user.profile.address2 = req.body.address2;
                user.profile.country = req.body.country;
                return [4 /*yield*/, user.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "User edited successfully!",
                    });
                }
                else {
                    error = new Error("User edit fail!");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("User doest not found!");
                error.statusCode = 404;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                if (!error_5.statusCode) {
                    error_5.statusCode = 500;
                }
                next(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.edit_profile = edit_profile;
var edit_avatar = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, filepath, result, error, error, error, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                filepath = req.file.path;
                if (!filepath) return [3 /*break*/, 3];
                user.profile.avatar = req.file.path;
                return [4 /*yield*/, user.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        messsage: "Profile Image edited succefully!",
                    });
                }
                else {
                    error = new Error("User avatar edit failed.");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("Please select file");
                error.statusCode = 404;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error = new Error("User doest not found");
                error.statusCode = 404;
                throw error;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                if (!error_6.statusCode) {
                    error_6.statusCode = 500;
                }
                next(error_6);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.edit_avatar = edit_avatar;
var get_all_users = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error, error, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(req.userRole === "system_admin")) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.default.find()];
            case 1:
                users = _a.sent();
                if (users) {
                    res.status(200).json({
                        Data: users,
                        message: "success",
                        status: 1,
                    });
                }
                else {
                    error = new Error("Users not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error = new Error("You does not have permission!");
                error.statusCode = 401;
                throw error;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                if (!error_7.statusCode) {
                    error_7.statusCode = 500;
                    throw error_7;
                }
                next(error_7);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.get_all_users = get_all_users;
var delete_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, deleted_user, error, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findByIdAndDelete(req.userId)];
            case 1:
                deleted_user = _a.sent();
                if (deleted_user) {
                    res.status(200).json({
                        Data: deleted_user,
                        status: 1,
                        message: "User deleted successfully!",
                    });
                }
                else {
                    error = new Error("User doest not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                if (!error_8.statusCode) {
                    error_8.statusCode = 500;
                    throw error_8;
                }
                next(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_user = delete_user;
//# sourceMappingURL=user.js.map