import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter category name"],
      unique: [true, "This category is already added"],
    },
    img: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("category", categorySchema);
