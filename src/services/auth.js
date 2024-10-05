import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ email, password, mobile, name, address }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
          mobile,
          name,
          address,
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2d",
            }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mess: response[1] ? "Register Succesfully" : "Email is used",
        "access token": token ? `Bearer ${token} ` : null,
      });
      resolve({
        err: 1,
        mess: "Register service",
      });
    } catch (error) {
      reject(error);
    }
  });
export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2d",
            }
          )
        : null;

      if (token) {
        resolve({
          err: 0,
          mess: "Login Successfully",
          "access token": `Bearer ${token}`,
          token,
          role_code: response.role_code,
        });
      } else {
        resolve({
          err: 1,
          mess: response ? "Password is wrong" : "Email is not registered",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// export const login = ({ email, password }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.User.findOne({
//         where: { email },
//         raw: true,
//       });
//       const isChecked =
//         response && bcrypt.compareSync(password, response.password);
//       const token = isChecked
//         ? jwt.sign(
//             {
//               id: response.id,
//               email: response.email,
//               role_code: response.role_code,
//             },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "2d",
//             }
//           )
//         : null;
//       resolve({
//         err: token ? 0 : 1,
//         mess: token
//           ? "Login Succesfully"
//           : response
//           ? "password is wrong"
//           : "email is not registered",
//         "access token": token ? `Bearer ${token} ` : null,
//         role_code: response.role_code,
//       });
//       resolve({
//         err: 1,
//         mess: "Register service",
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

export const loginSucces = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
      });
      const token = response
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "5d",
            }
          )
        : null;
      resolve({
        err: token ? 0 : 3,
        mess: "Login Successfully",
        "access token": `Bearer ${token}`,
        token,
        role_code: response.role_code,
      });
    } catch (error) {
      reject(error);
    }
  });
