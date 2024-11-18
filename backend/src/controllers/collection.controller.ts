import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import { Collection } from "../models/collection.model";

export const getCollections: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const collections = await Collection.find({});

  res.status(200).json({
    status: 200,
    data: {
      collections,
    },
  });
};

export const createCollection: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const collection = await Collection.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      collection,
    },
  });
};

export const getCollection: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const collection = await Collection.findById(id);

  if (!collection) {
    throw ApiError.badRequest("Collection not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      collection,
    },
  });
};



export const deleteCollection: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const collection = await Collection.findByIdAndDelete(id);

  if (!collection) {
    throw ApiError.badRequest("Collection not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      collection,
    },
  });
};

export const updateCollection: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const collection = await Collection.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!collection) {
    throw ApiError.badRequest("Collection not found");
  }

  res.status(200).json({
    status: 200,
    data: {
      collection,
    },
  });
};

export const collectionController = {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
