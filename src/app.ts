import express from "express";
import dotenv from "dotenv";
import { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import path from "path";
import error from "./middlewares/error";
import UserRouter from "./route/user";
import CategoryRouter from "./route/category";
import ProductRouter from "./route/product";
import OrderRouter from "./route/order";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const db = process.env.DB || "";
app.use(cors());
app.use(express.static(path.join(__dirname + ".." + "images")));
const Storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "images");
  },
  filename: function (_req, file, cb) {
    cb(null, v4() + "_" + file.originalname);
  },
});
const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: Storage, fileFilter: fileFilter }).single("image"));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });

    // route
    //json middle
    app.use(express.json());
    //user_route
    app.use("/api/v1/user", UserRouter);
    //category route
    app.use("/api/v1/category", CategoryRouter);

    //product route
    app.use("/api/v1/product", ProductRouter);

    //order route
    app.use("/api/v1/order", OrderRouter);
    //error middleware
    app.use(error);

    // route
  })
  .catch((err) => {
    console.log(err.message);
  });
