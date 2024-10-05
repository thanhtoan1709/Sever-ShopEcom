import passport from "passport";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));
export const getOne = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userID },
        attributes: {
          exclude: ["password", "role_code"],
        },
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["id", "code", "value"],
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mess: response ? "Got" : "User not found",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAlluser = ({ skip, limit }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        offset: skip,
        limit: limit,
      });
      resolve({
        err: 0,
        mess: "Success",
        total: await db.Products.count(),
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const delUser = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({ where: { id: userID } });
      resolve({
        err: 0,
        mess: response ? "User deleted" : "User not found",
      });
    } catch (error) {
      reject(error);
    }
  });
