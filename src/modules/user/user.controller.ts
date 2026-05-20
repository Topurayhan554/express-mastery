import type { Request, Response } from "express";

import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrived success",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getSingleByUserDB(id as string);

  try {
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Users retrived success",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const putUsers = async (req: Request, res: Response) => {
  const { id } = req.params;

  // console.log("id", id);
  // console.log({ name, password, age, is_active });

  const result = await userService.putUserDB(req.body, id as string);

  if (result.rows.length === 0) {
    res.status(404).json({
      succcess: false,
      message: "User not found",
    });
  }

  // console.log(result);

  try {
    res.status(200).json({
      success: true,
      message: "Users updated success",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.deleteUserDB(id as string);

  try {
    if (result.rows.length === 0) {
      res.status(404).json({
        succcess: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users deleted success",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  putUsers,
  deleteUser,
};
