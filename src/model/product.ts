import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const productSchema = new Schema(
  {
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
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
    supplier: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("product", productSchema);
