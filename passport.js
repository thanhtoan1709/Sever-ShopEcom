var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const passport = require("passport");
import { email } from "./src/helper/joi_chema";
import db from "./src/models";

import crypto from "crypto";
import bcrypt from "bcryptjs";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback", // Đảm bảo bạn đã cung cấp đúng callbackURL
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      const defaultPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      if (profile?.id) {
        const response = await db.User.findOrCreate({
          where: {
            id: profile.id,
          },
          defaults: {
            id: profile.id,
            email: profile.emails[0]?.value,
            typeLogin: profile?.provider,
            name: profile?.displayName,
            password: hashedPassword,
          },
        });
      }

      cb(null, profile);
    }
  )
);
