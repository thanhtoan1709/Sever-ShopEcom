import db from "../models";
const cloudinary = require("cloudinary").v2;
import { Op } from "sequelize"; // Import Op từ Sequelize
//
// export const getAllproduct = async ({ skip, limit }) => {
//   try {
//     const products = await db.Products.findAll({
//       offset: skip,
//       limit: limit,
//     });
//     return {
//       products,
//       total: await db.Products.count(),
//     };
//   } catch (error) {
//     throw error;
//   }
// };

export const getAllproduct = async ({
  page,
  limit,
  orderBy,
  sortBy,
  keyword,
}) => {
  try {
    const queries = {
      offset: (page - 1) * limit,
      limit,
    };
    const products = await db.Products.findAndCountAll({
      ...queries,
    });
    const response = {
      totalPages: Math.ceil(products?.count / limit),
      totalItems: products?.count,
      data: products?.rows,
    };
    return {
      response,
    };
  } catch (error) {
    throw error;
  }
};

export const createNewProduct = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Body received in service:", body);
      const response = await db.Products.findOrCreate({
        where: { id_pr: body?.id_pr },
        defaults: { ...body, imageProduct: fileData?.path },
      });

      resolve({
        err: response[1] ? 0 : 1,
        mess: response[1] ? "created" : "can't Create new Product",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      console.error("Error in createNewProduct service:", error);
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
//
//

export const updateProduct = ({ id_pr, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) body.imageProduct = fileData?.path;
      console.log("Body received in service:", body);
      const response = await db.Products.update(body, { where: { id_pr } });
      console.log("Response from findOrCreate:", response);
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mess:
          response[0] > 0
            ? `${response[0]} product update`
            : "can't update Product",
      });
      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      console.error("Error in updateProduct service:", error);
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
//

export const delProduct = ({ id_pr }) =>
  new Promise(async (resolve, reject) => {
    try {
      // if (fileData) body.imageProduct = fileData?.path;
      const response = await db.Products.destroy({ where: { id_pr } });
      resolve({
        err: response > 0 ? 0 : 1,
        mess: response > 0 ? `${response} product del` : "can't del Product",
      });
    } catch (error) {
      console.error("Error in delProduct service:", error);
      reject(error);
    }
  });
//

export const getProductById = async (productId) => {
  try {
    // Thực hiện truy vấn cơ sở dữ liệu để lấy sản phẩm dựa trên ID
    const product = await db.Products.findOne({
      where: { id_pr: productId },
    });

    // Kiểm tra nếu sản phẩm tồn tại
    if (product) {
      return {
        error: false,
        message: "Product found",
        product: product,
      };
    } else {
      return {
        error: true,
        message: "Product not found",
        product: null,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
