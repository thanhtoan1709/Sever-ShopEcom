import { notAuth } from "./handle_errors";
export const isAdmin = (req, res, next) => {
  console.log(req.user);
  const { role_code } = req.user;
  if (role_code != "R1") return notAuth("Require role Admin", res);
  next();
};
export const isNV = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code != "R1" && role_code != "R2")
    return notAuth("Require role Admin or Nhân viên", res);
  next();
};
