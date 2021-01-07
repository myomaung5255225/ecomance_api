"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "require product name"],
    },
    description: {
        type: String,
        required: [true, "Enter product description"],
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Enter product price"],
    },
    category: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "category",
    },
    order: [
        {
            type: mongoose_2.default.Types.ObjectId,
            ref: "order",
        },
    ],
    supplier: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
exports.default = mongoose_1.model("product", productSchema);
//# sourceMappingURL=product.js.map