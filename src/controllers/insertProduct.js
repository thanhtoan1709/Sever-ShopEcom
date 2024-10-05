import { internalSeverError } from "../middleware/handle_errors";
import * as services from "../services";
// import { email, password, mobile, address, name } from "../helper/joi_chema";
// import joi from "joi";

export const insertData = async (req, res) => {
  try {
    const response = await services.insertData();
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};
