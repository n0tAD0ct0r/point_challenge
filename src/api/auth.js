const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err) {
        return next(new Error("An error occurred."));
      }

      if (!user) {
        return next(new Error("user or password is incorrect"));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const token = jwt.sign({ username: user.username }, SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
