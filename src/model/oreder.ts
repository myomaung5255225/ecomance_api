import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const orderSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
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
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("order", orderSchema);
