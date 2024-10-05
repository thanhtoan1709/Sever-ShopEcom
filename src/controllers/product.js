import joi from "joi";
import {
  code_cat,
  id_pr,
  priceProduct,
  productName,
  imageProduct,
  productColor,
  size,
  sub_cat,
  soluong,
  goWhere,
  styleFilter,
  eventFilter,
} from "../helper/joi_chema";
import * as services from "../services";
import { badRequest, internalSeverError } from "../middleware/handle_errors";
const cloudinary = require("cloudinary").v2;

export const createNewProduct = async (req, res) => {
  console.log(req.body);
  try {
    const fileData = req.file;
    const { error } = joi
      .object({
        id_pr,
        priceProduct,
        code_cat,
        productName,
        imageProduct,
        productColor,
        sub_cat,
        size,
        soluong,
        goWhere,
        styleFilter,
        eventFilter,
      })
      .validate({ ...req.body, imageProduct: fileData?.path });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);

      return badRequest(error.details[0].message, res);
    }
    const response = await services.createNewProduct(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in createNewProduct:", error);
    return internalSeverError(res);
  }
};
//
//
// update

export const updateProduct = async (req, res) => {
  console.log(req.user);
  try {
    const fileData = req.file;
    console.log(req.body);
    const { error } = joi
      .object({
        id_pr,
      })
      .validate({ id_pr: req.body.id_pr });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);

      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateProduct(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in createNewProduct:", error);
    return internalSeverError(res);
  }
};
//

export const delProduct = async (req, res) => {
  try {
    const { error } = joi
      .object({
        id_pr,
      })
      .validate(req.query);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.delProduct(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in createNewProduct:", error);
    return internalSeverError(res);
  }
};
//
//
// Get All
// export const getAllproduct = async (req, res) => {
//   try {
//     const PAGE_SIZE = 12; // Số lượng sản phẩm trên mỗi trang
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const skip = (page - 1) * PAGE_SIZE;

//     const response = await services.getAllproduct({ skip, limit: PAGE_SIZE });
//     return res.status(200).json(response);
//   } catch (error) {
//     return internalSeverError(res);
//   }
// };

export const getAllproduct = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      orderBy = "email",
      sortBy = "asc",
      keyword,
    } = req.query;
    const response = await services.getAllproduct({
      page: +page ? +page : 1,
      limit: +limit ? +limit : 3,
      orderBy,
      sortBy,
      keyword,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching products:", error); // Ghi log lỗi chi tiết
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy ID sản phẩm từ request params
    const response = await services.getProductById(productId); // Gọi service function để lấy thông tin sản phẩm
    return res.status(200).json(response); // Trả về kết quả dưới dạng JSON
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message,
    }); // Xử lý lỗi nếu có
  }
};
