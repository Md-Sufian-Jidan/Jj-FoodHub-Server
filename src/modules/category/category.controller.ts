import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.createCategoryInDB(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create category",
            error: error.message,
        });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.getAllCategoriesFromDB();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const categoryController = {
    createCategory,
    getAllCategories,
};