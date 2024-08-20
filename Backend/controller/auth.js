const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userdb = require("../model/userSchema");

dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET || "your-secret-key"; // Ensure this is set in your environment variables

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
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
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// Google login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.NODE_ENV === 'production' ? "https://take-online-money.web.app/login" : "http://localhost:5173/login"
  }),
  (req, res) => {
    const user = req.user;

    // Generate JWT token
    const token = jwt.sign({ googleID: user.googleID }, secretKey, {
      expiresIn: "1h",
    });
    console.log("User authenticated:", req.user);

    // Redirect to dashboard with token as query parameter
    res.redirect(
      `${process.env.NODE_ENV === 'production' ? 'https://take-online-money.web.app' : 'http://localhost:5173'}/dashboard?token=${token}`
    );
  }
);

// Route to check login success
router.get("/login/success", (req, res) => {
  console.log("Request Headers:", req.headers); // Log headers
  console.log("Request User:", req.user); // Log user data

  if (req.user) {
    res.status(200).json({ message: "User Login", user: req.user });
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.NODE_ENV === 'production' ? "https://take-online-money.web.app" : "http://localhost:5173");
  });
});

module.exports = { router, passport };
