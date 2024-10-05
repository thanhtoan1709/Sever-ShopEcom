import { internalSeverError, badRequest } from "../middleware/handle_errors";
import { email, password, mobile, address, name } from "../helper/joi_chema";
import joi from "joi";
import * as services from "../services";

export const register = async (req, res) => {
  try {
    const { error } = joi
      .object({ email, password, mobile, name, address })
      .validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};

export const loginSucces = async (req, res) => {
  const { id } = req?.body;
  try {
    if (!id) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.loginSucces(id);
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};
