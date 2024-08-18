// auth.js

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userdb = require("../model/userSchema");

dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET || "your-secret-key"; // Ensure this is in your environment variables

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
  done(null, user.id); // Save only the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id); // Retrieve the user by ID
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://take-e3k2.vercel.app/login",
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
      `https://take-e3k2.vercel.app/dashboard?token=${token}` // Attach token as a query parameter
    );
  }
);

router.get("/login/success", (req, res) => {
  res.set('Cache-Control', 'no-store');
  console.log("req.user in /login/success:", req.user);
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
    res.redirect("https://take-e3k2.vercel.app/");
  });
});

module.exports = { router, passport };
