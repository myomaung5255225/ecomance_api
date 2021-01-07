import { Router } from "express";
import User from "../model/user";
import isAuth from "../middlewares/isAuth";
import {
  delete_user,
  edit_avatar,
  edit_profile,
  get_all_users,
  login_user,
  signup_customer,
  signup_supplier,
  get_profile,
} from "../controller/user";
import { body } from "express-validator";
const router = Router();
router.get("/get_all_user", isAuth, [], get_all_users);
router.post(
  "/customer_signup",
  [
    body("email")
      .notEmpty()
      .normalizeEmail()
      .isEmail()
      .custom((v: any) => {
        return User.findOne({ email: v }).then((user) => {
          if (user) {
            return Promise.reject("Email is already used.");
          } else {
            return Promise.resolve();
          }
        });
      }),
    body("password").notEmpty().isStrongPassword(),
  ],
  signup_customer
);
router.post(
  "/supplier_signup",
  [
    body("email")
      .notEmpty()
      .normalizeEmail()
      .isEmail()
      .custom((v: any) => {
        return User.findOne({ email: v }).then((user) => {
          if (user) {
            return Promise.reject("Email is already used.");
          } else {
            return Promise.resolve();
          }
        });
      }),
    body("password").notEmpty().isStrongPassword(),
  ],
  signup_supplier
);
router.post(
  "/signin",
  [
    body("email")
      .notEmpty()
      .normalizeEmail()
      .isEmail()
      .custom((v: any) => {
        return User.findOne({ email: v }).then((user) => {
          if (!user) {
            return Promise.reject("User does not exist.");
          } else {
            return Promise.resolve();
          }
        });
      }),
    body("password").notEmpty().isStrongPassword(),
  ],
  login_user
);
router.put(
  "/edit_profile",
  isAuth,
  [
    body("fullname").notEmpty().withMessage("Full name required"),
    body("gender")
      .notEmpty()
      .withMessage("gender must not be empty e.g male,female,other"),
    body("address1").notEmpty().withMessage("Address 1 must not be empty"),
    body("address2").notEmpty().withMessage("Address 2 must not be empty"),
    body("country").notEmpty().withMessage("Country must not be emptry"),
  ],
  edit_profile
);
router.put("/edit_avatar", isAuth, [], edit_avatar);
router.delete("/delte_user", isAuth, [], delete_user);
router.get("/get_profile", isAuth, get_profile);
export default router;
