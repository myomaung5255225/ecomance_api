import { Router } from "express";
import { body } from "express-validator";
import {
  create_order,
  get_order_by_product,
  get_order_by_user,
  update_order,
} from "../controller/order";
import isAuth from "../middlewares/isAuth";
const router = Router();
router.post(
  "/create_order",
  isAuth,
  [
    body("product_id").notEmpty().withMessage("Product Id must not be empty"),
    body("remark").notEmpty().withMessage("Remark must not be empty"),
  ],
  create_order
);
router.get("/get_order_by_user", isAuth, get_order_by_user);
router.get(
  "/get_order_by_product",
  isAuth,
  [body("product_id").notEmpty().withMessage("Product Id must not be empty")],
  get_order_by_product
);
router.put(
  "/update_order",
  isAuth,
  [
    body("product_id").notEmpty().withMessage("Product Id must not be empty"),
    body("order_id").notEmpty().withMessage("Order Id must not be empty"),
    body("status")
      .notEmpty()
      .withMessage("Status must not be empty e.g true or false"),
  ],
  update_order
);
export default router;
