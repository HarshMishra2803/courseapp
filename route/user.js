const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");

const JWT_USER_PASSWORD = "sjfdgdjajdg";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // hash the password

  await userModel.create({
    email: email,
    password: password,
    firstName,
    lastName,
  });

  res.json({
    message: "signup succeeded",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
