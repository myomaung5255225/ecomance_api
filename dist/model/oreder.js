"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "product",
    },
    remark: {
        type: String,
        required: [true, "require remark"],
    },
    order_status: {
        type: Boolean,
        enum: [true, false],
    },
    payment_status: {
        type: Boolean,
        enum: [true, false],
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
exports.default = mongoose_1.model("order", orderSchema);
//# sourceMappingURL=oreder.js.map