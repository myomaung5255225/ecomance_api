"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, _res, next) {
    try {
        var auth_header = req.get("Authorization");
        if (auth_header) {
            var token = auth_header.split(" ")[1];
            var decoded_token = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
            if (decoded_token) {
                req.userId = decoded_token.userId;
                req.userRole = decoded_token.userRole;
                next();
            }
            else {
                var error = new Error("Unauthorized User!");
                error.statusCode = 401;
                throw error;
            }
        }
        else {
            var error = new Error("Unauthorized User!");
            error.statusCode = 401;
            throw error;
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=isAuth.js.map