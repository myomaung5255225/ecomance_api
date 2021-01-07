import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "enter a email address"],
      unique: [true, "This email is already used!"],
    },
    password: {
      type: String,
      required: [true, "type your password"],
      min: [8, "minumum password length is 8 characters."],
    },
    role: {
      type: String,
      enum: ["customer", "supplier", "system_admin"],
      default: "customer",
    },
    profile: {
      avatar: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
      },
      fullname: {
        type: String,
        default: "",
      },
      address1: {
        type: String,
        default: "",
      },
      address2: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "Myanmar",
      },
    },
  },
  { timestamps: true }
);

export default model("user", userSchema);
