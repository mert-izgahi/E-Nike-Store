import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import { Size } from "../models/size.model";

export const createSize: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const size = await Size.create(req.body);

    res.status(201).json({
        status: 201,
        data: {
            size,
        },
    });
};

export const deleteSize: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const size = await Size.findByIdAndDelete(id);

    if (!size) {
        throw ApiError.badRequest("Size not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            size,
        },
    });
};

export const updateSize: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const size = await Size.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!size) {
        throw ApiError.badRequest("Size not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            size,
        },
    })
};

export const getSizes: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const sizes = await Size.find({});

    res.status(200).json({
        status: 200,
        data: {
            sizes,
        },
    });
};

export const getSize: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const size = await Size.findById(id);

    if (!size) {
        throw ApiError.badRequest("Size not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            size,
        },
    });
}

export const sizeController = {
    createSize,
    deleteSize,
    updateSize,
    getSizes,
    getSize
};