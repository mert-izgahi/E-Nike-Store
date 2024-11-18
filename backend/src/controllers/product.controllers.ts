import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import { Product } from "../models/product.model";

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const products = await Product.find({});

  res.status(200).json({
    status: 200,
    data: {
      products,
    },
  });
};

export const getProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw ApiError.badRequest("Product not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      product,
    },
  });
};

export const createProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      product,
    },
  });
};

export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!product) {
    throw ApiError.badRequest("Product not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      product,
    },
  });
};

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw ApiError.badRequest("Product not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      product,
    },
  });
}

export const productControllers = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
