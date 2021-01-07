import { Response, NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import Product from "../model/product";

//create products

interface newProduct {
  name: String;
  description: String;
  img: String;
  price: Number;
  category: any;
  supplier: any;
}
export const create_product = async (
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
        error.statusCode = 442;
        throw error;
      }
      if (req.file) {
        const create_product: newProduct = {
          name: req.body.name,
          description: req.body.description,
          img: req.file.path,
          price: req.body.price,
          category: req.body.category_id,
          supplier: req.userId,
        };
        const product = new Product(create_product);
        const result = await product.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "Product create successfully",
          });
        } else {
          const error: any = new Error("Product create fail");
          error.statusCode = 442;
          throw error;
        }
      } else {
        const error: any = new Error("Please select product image");
        error.statusCode = 442;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to create product"
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

export const get_all_products = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().sort({ updatedAt: "desc" });
    if (products) {
      res.status(200).json({
        Data: products,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("Products not found!");
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

export const get_product_by_category = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 442;
      error.data = errors.array();
      throw error;
    }
    const products = await Product.find()
      .sort({ updatedAt: "desc" })
      .where({ category: req.body.id });
    if (products) {
      res.status(200).json({
        Data: products,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("Products not found!");
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

export const get_product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 442;
      error.data = errors.array();
      throw error;
    }
    const product = await Product.findById(req.body.id);
    if (product) {
      res.status(200).json({
        Data: product,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("Product not found!");
      error.statusCode = 442;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
//for suppliers
export const get_products_by_suppliers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().where({ supplier: req.userId });
    if (products) {
      res.status(200).json({
        Data: products,
        status: 1,
        message: "success",
      });
    } else {
      const error: any = new Error("Products not found!");
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

export const edit_product = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Valation failed");
      error.statusCode = 442;
      error.data = errors.array();
      throw error;
    }
    const product: any = await Product.findById(req.body.id).where({
      supplier: req.userId,
    });
    if (product) {
      if (req.file) {
        product.img = req.file.path;
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category_id;
        product.descrption = req.body.descrption;
      } else {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category_id;
        product.descrption = req.body.descrption;
      }
      const result = await product.save();
      if (result) {
        res.status(201).json({
          Data: result,
          status: 1,
          message: "Product updated successfully",
        });
      } else {
        const error: any = new Error("Product edit fail");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to edit this product"
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

//delete product

export const delete_product = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.statusCode = 442;
      error.data = errors.array();
      throw error;
    }
    const product = await Product.findByIdAndDelete(req.body.id).where({
      supplier: req.userId,
    });
    if (product) {
      res.status(200).json({
        Data: product,
        status: 1,
        message: "Product deleted successfully",
      });
    } else {
      const error: any = new Error(
        "You does not have permission to delete this product"
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
