import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Category from "../model/category";
export const get_all_categories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.find();
    if (category) {
      res.status(200).json({
        Data: category,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("Categories not found!");
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

export const get_categroy = async (
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
    } else {
      const category = await Category.findById(req.body.id);
      if (category) {
        res.status(200).json({
          Data: category,
          status: 1,
          message: "success",
        });
      } else {
        const error: any = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 404;
    }
    next(error);
  }
};

interface new_category {
  name: String;
  img: String;
  user: String;
}

export const create_category = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "supplier" || "system_admin") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed");
        error.data = errors.array();
        error.statusCode = 422;
        throw error;
      }
      if (!req.file) {
        const error: any = new Error("select category image");
        error.statusCode = 422;
        throw error;
      }
      const create_category: new_category = {
        name: req.body.name,
        img: req.file.path,
        user: req.userId,
      };
      const category = new Category(create_category);
      const result = await category.save();
      if (result) {
        res.status(200).json({
          Data: result,
          status: 1,
          message: "Category create successfully!",
        });
      } else {
        const error: any = new Error("fail");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to create category"
      );
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const edit_category = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "system_admin" || "supplier") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const category: any = await Category.findById(req.body.id).where({
        user: req.userId,
      });
      if (category) {
        if (req.file) {
          category.name = req.body.name;
          category.img = req.file.path;
        } else {
          category.name = req.body.name;
        }
        const result = await category.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "Category updated successfully",
          });
        } else {
          const error: any = new Error("Category edit fail!");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error("Category not found!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to edit this category!"
      );
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const delete_category = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "system_admin" || "supplier") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed");
        error.data = errors.array();
        error.statusCode = 442;
        throw error;
      }
      const category = await Category.findByIdAndDelete(req.body.id).where({
        user: req.userId,
      });
      if (category) {
        res.status(200).json({
          Data: category,
          status: 1,
          message: "Category deleted successfully!",
        });
      } else {
        const error: any = new Error(
          "You does not have permission to delete this category!"
        );
        error.statusCode = 401;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to delete this category!"
      );
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
