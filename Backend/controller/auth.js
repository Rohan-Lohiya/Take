// auth.js

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userdb = require("../model/userSchema");

dotenv.config();

const router = express.Router();

const secretKey = "6c730a8a5d4671897f8f254fe2b0abef2374fcd4d788baf7c8bde3e7c9e9da18" || "your-secret-key"; // Ensure this is in your environment variables

passport.use(
  new GoogleStrategy(
    {
      clientID: "517796194757-dhta0meb292ef9190tn3de4vkv33rm3i.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://take-ten.vercel.app/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        let user = await userdb.findOne({ googleID: profile.id });
        if (!user) {
          user = new userdb({
            googleID: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            balance: 1000,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://take-online-money.web.app/login",
  }),
  (req, res) => {
    const user = req.user;

    // Generate JWT token
    const token = jwt.sign({ googleID: user.googleID }, secretKey, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    console.log(token);
    // Send token back to client
    res.redirect(
      `https://take-online-money.web.app/dashboard?token=${token}` // Attach token as a query parameter
    );
  }
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User Login", user: req.user });
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("https://take-online-money.web.app/");
  });
});

module.exports = { router, passport };
