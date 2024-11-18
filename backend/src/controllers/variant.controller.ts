import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import { Variant } from "../models/variant.model";

export const getVariants: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const variants = await Variant.find();

    res.status(200).json({
        status: 200,
        data: {
            variants,
        },
    });
};

export const createVariant: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const variant = await Variant.create(req.body);

    res.status(201).json({
        status: 201,
        data: {
            variant,
        },
    });
};

export const getVariant: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const variant = await Variant.findById(id);

    if (!variant) {
        throw ApiError.badRequest("Variant not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            variant,
        },
    });
};

export const deleteVariant: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const variant = await Variant.findByIdAndDelete(id);

    if (!variant) {
        throw ApiError.badRequest("Variant not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            variant,
        },
    });
};

export const updateVariant: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const variant = await Variant.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!variant) {
        throw ApiError.badRequest("Variant not found");
    }

    res.status(200).json({
        status: 200,
        data: {
            variant,
        },
    });
};

export const variantController = {
    getVariants,
    createVariant,
    getVariant,
    deleteVariant,
    updateVariant
}