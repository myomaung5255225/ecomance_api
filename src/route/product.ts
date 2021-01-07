import { Router } from "express";
import { body } from "express-validator";
import {
  create_product,
  delete_product,
  edit_product,
  get_all_products,
  get_product,
  get_products_by_suppliers,
  get_product_by_category,
} from "../controller/product";
import isAuth from "../middlewares/isAuth";
const router = Router();
router.get("/get_all_products", get_all_products);
router.get(
  "/get_product",
  [body("id").notEmpty().withMessage("Product Id required")],
  get_product
);
router.get(
  "/get_product_by_category",
  [body("id").notEmpty().withMessage("Category Id required")],
  get_product_by_category
);
router.get("/get_products_by_suppliers", isAuth, get_products_by_suppliers);
router.post(
  "/create_product",
  isAuth,
  [
    body("name").notEmpty().withMessage("Product name must not be empty"),
    body("description")
      .notEmpty()
      .withMessage("Product Description must not be empty"),
    body("price").notEmpty().withMessage("Product price must not be empty"),
    body("category_id").notEmpty().withMessage("Category Id must not be empty"),
  ],
  create_product
);
router.put(
  "/edit_product",
  isAuth,
  [
    body("name").notEmpty().withMessage("Product name must not be empty"),
    body("description")
      .notEmpty()
      .withMessage("Product Description must not be empty"),
    body("price").notEmpty().withMessage("Product price must not be empty"),
    body("category_id").notEmpty().withMessage("Category Id must not be empty"),
    body("id").notEmpty().withMessage("Product Id must not be empty"),
  ],
  edit_product
);
router.delete(
  "/delete_product",
  isAuth,
  [body("id").notEmpty().withMessage("Product Id must not be empty")],
  delete_product
);
export default router;
