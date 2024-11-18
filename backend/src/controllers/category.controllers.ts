import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import { Category } from "../models/category.model";

export const getCategories: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const categories = await Category.find({});

  res.status(200).json({
    status: 200,
    data: {
      categories,
    },
  });
};

export const createCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      category,
    },
  });
};

export const getCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw ApiError.badRequest("Category not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      category,
    },
  });
};

export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) {
    throw ApiError.badRequest("Category not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      category,
    },
  });
};

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw ApiError.badRequest("Category not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      category,
    },
  });
};

export const getParentCategories: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const categories = await Category.find({ parent: null });

  res.status(200).json({
    status: 200,
    data: {
      categories,
    },
  });
};


export const categoryControllers = {
  getCategories,
  getParentCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};