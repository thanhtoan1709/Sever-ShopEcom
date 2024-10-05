import joi from "joi";

export const email = joi
  .string()
  .pattern(new RegExp("\\.(com|vn)$"))
  .required();
export const password = joi.string().min(6).required();
export const mobile = joi
  .string()
  .pattern(/^[0-9]{10}$/)
  .required()
  .messages({
    "string.base": "Mobile number must be a string",
    "string.pattern.base": "Invalid mobile number",
    "any.required": "Mobile number is required",
  });
export const name = joi.string();
export const address = joi.string();
//
export const id_pr = joi.string().required();
export const priceProduct = joi.number();
export const pricesaleProduct = joi.number();
export const productName = joi.string().required();
export const code_cat = joi.string().uppercase().alphanum();
export const sub_cat = joi.string();
export const imageProduct = joi.string();
export const productColor = joi.string().optional();
export const size = joi.string();
export const soluong = joi.number();
export const goWhere = joi.string();
export const eventFilter = joi.string();
export const styleFilter = joi.string();
// export const soluong = joi.number();
