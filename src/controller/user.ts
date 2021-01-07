import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// signup user
interface NewCustomer {
  email: String;
  password: String;
}
interface NewSupplier {
  email: String;
  password: String;
  role: String;
}
export const signup_customer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const password = bcrypt.hashSync(req.body.password, 12);
    const newuser: NewCustomer = {
      email: req.body.email,
      password: password,
    };
    const user = new User(newuser);
    const result: any = await user.save();
    if (result) {
      const token = jwt.sign(
        { userId: result.id, userRole: result.role },
        process.env.SECRET || "secret",
        { expiresIn: "1d" }
      );
      res.status(201).json({
        Data: result,
        status: 1,
        message: "New customer created successfully!",
        access_token: token,
      });
    } else {
      const error: any = new Error("Register fail");
      error.statusCode = 422;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//signup supplier
export const signup_supplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const password = bcrypt.hashSync(req.body.password, 12);
    const newuser: NewSupplier = {
      email: req.body.email,
      password: password,
      role: "supplier",
    };
    const user = new User(newuser);
    const result: any = await user.save();
    if (result) {
      const token = jwt.sign(
        { userId: result.id, userRole: result.role },
        process.env.SECRET || "secret",
        { expiresIn: "1d" }
      );
      res.status(201).json({
        Data: result,
        status: 1,
        message: "New supplier created successfully!",
        access_token: token,
      });
    } else {
      const error: any = new Error("Register fail");
      error.statusCode = 422;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//login_user

export const login_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const is_user: any = await User.findOne({ email: req.body.email });
    if (is_user) {
      const is_password_correct = bcrypt.compareSync(
        req.body.password,
        is_user.password
      );
      if (is_password_correct) {
        const token = jwt.sign(
          { userId: is_user.id, userRole: is_user.role },
          process.env.SECRET || "secret",
          { expiresIn: "1d" }
        );
        res.status(200).json({
          Data: is_user,
          status: 1,
          message: "login successful",
          access_token: token,
        });
      } else {
        const error: any = new Error("Password not match!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("User does not exist!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//get_profile

export const get_profile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (user) {
      res.status(200).json({
        Data: user,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("User does not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const edit_profile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (user) {
      user.profile.fullname = req.body.fullname;
      user.profile.gender = req.body.gender;
      user.profile.address1 = req.body.address1;
      user.profile.address2 = req.body.address2;
      user.profile.country = req.body.country;
      const result = await user.save();
      if (result) {
        res.status(201).json({
          Data: result,
          status: 1,
          message: "User edited successfully!",
        });
      } else {
        const error: any = new Error("User edit fail!");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("User doest not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const edit_avatar = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (user) {
      const filepath = req.file.path;
      if (filepath) {
        user.profile.avatar = req.file.path;
        const result = await user.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            messsage: "Profile Image edited succefully!",
          });
        } else {
          const error: any = new Error("User avatar edit failed.");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("Please select file");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("User doest not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const get_all_users = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "system_admin") {
      const users = await User.find();
      if (users) {
        res.status(200).json({
          Data: users,
          message: "success",
          status: 1,
        });
      } else {
        const error: any = new Error("Users not found!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("You does not have permission!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};

export const delete_user = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const deleted_user = await User.findByIdAndDelete(req.userId);
    if (deleted_user) {
      res.status(200).json({
        Data: deleted_user,
        status: 1,
        message: "User deleted successfully!",
      });
    } else {
      const error: any = new Error("User doest not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};
