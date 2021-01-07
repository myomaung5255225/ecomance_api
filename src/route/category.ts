import { Router } from "express";
import { body } from "express-validator";
import {
  create_category,
  delete_category,
  edit_category,
  get_all_categories,
  get_categroy,
} from "../controller/category";
import isAuth from "../middlewares/isAuth";
import Category from "../model/category";

const router = Router();
router.get("/all_categories", get_all_categories);
router.get(
  "/get_category",
  [body("id").notEmpty().withMessage("category_id must not be empty")],
  get_categroy
);
router.post(
  "/create_category",
  isAuth,
  [
    body("name")
      .notEmpty()
      .custom((v: any) => {
        return Category.findOne({ name: v }).then((category) => {
          if (category) {
            return Promise.reject("This category is already added.");
          } else {
            return Promise.resolve();
          }
        });
      }),
  ],
  create_category
);
router.put(
  "/edit_category",
  isAuth,
  [
    body("id").notEmpty().withMessage("category_id must not be empty"),
    body("name").notEmpty().withMessage("Category name must not be empty"),
  ],

  edit_category
);
router.delete(
  "/delete_category",
  isAuth,
  [body("id").notEmpty().withMessage("category_id must not be empty")],
  delete_category
);

export default router;
