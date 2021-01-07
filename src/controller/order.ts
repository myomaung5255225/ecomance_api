import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Order from "../model/oreder";
import Product from "../model/product";
export const get_order_by_user = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "system_admin") {
      const order = await Order.find();
      if (order) {
        res.status(200).json({
          Data: order,
          status: 1,
          message: "success",
        });
      } else {
        const error: any = new Error("Orders not found!");
        error.statusCode = 404;
        throw error;
      }
    }
    if (req.userRole === "customer") {
      const order = await Order.find({ user: req.userId });

      if (order) {
        res.status(200).json({
          Data: order,
          status: 1,
          message: "success",
        });
      } else {
        const error: any = new Error("Orders not found!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does have permission to view all oreders"
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

export const get_order_by_product = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "system_admin" || "supplier") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation Failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const product: any = await Product.findById(req.body.product_id).populate(
        "order"
      );
      if (product) {
        res.status(200).json({
          Data: product.order,
          status: 1,
          message: "success",
        });
      } else {
        const error: any = new Error("Product not Found.");
        error.statusCode = 401;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to view those orders."
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

interface new_order {
  product: String;
  remark: String;
  user: String;
}

export const create_order = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "customer") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("validation failed");
        error.data = errors.array();
        error.statusCode = 422;
        throw error;
      }
      const create_order: new_order = {
        product: req.body.product_id,
        remark: req.body.remark,
        user: req.userId,
      };

      const order = new Order(create_order);
      const result = await order.save();
      if (result) {
        const product: any = await Product.findById(req.body.product_id);
        if (product) {
          product.order.push(result.id);
          const final_result = product.save();
          if (final_result) {
            res.status(201).json({
              Data: result,
              status: 1,
              message: "Order created successfully!",
            });
          } else {
            const error: any = new Error("Order fail");
            error.statusCode = 422;
            throw error;
          }
        } else {
          const error: any = new Error("Product not found!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("Order fail");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not need to order for this product"
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

export const update_order = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userRole === "supplier") {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error("Validation failed");
        error.data = errors.array();
        error.statusCode = 422;
        throw error;
      }
      const is_own: any = await Product.findById(req.body.product_id).where({
        supplier: req.userId,
      });
      if (is_own) {
        const order: any = await Order.findById(req.body.order_id).where({
          product: req.body.product_id,
        });
        if (order) {
          order.status = req.body.order_status;
          const order_result = await order.save();
          if (order_result) {
            res.status(201).json({
              Data: order_result,
              status: 1,
              message: "Order updated successfully!",
            });
          } else {
            const error: any = new Error("Order updated fail");
            error.statusCode = 422;
            throw error;
          }
        } else {
          const error: any = new Error(
            "You does have permission to update this order"
          );
          error.statusCode = 401;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You does have permission to update this order"
        );
        error.statusCode = 401;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
