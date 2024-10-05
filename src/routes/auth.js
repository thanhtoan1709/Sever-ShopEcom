import * as controllers from "../controllers";
import express from "express";
import passport from "passport";

require("dotenv").config();
const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);

// Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    // Log thông tin user ra console
    res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}`);
  }
);
router.post("/login-success", controllers.loginSucces);
module.exports = router;
