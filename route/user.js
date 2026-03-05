const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");

const {JWT_USER_PASSWORD} = require("../config");
const { usermiddleware } = require("../middleware/user");

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

userRouter.get("/purchases",usermiddleware, async(req, res) => {

    const userId =req.userId;

    const purchases = await purchaseModel.find({
        userId
    })

    // let purchasecourseId = [];;
    // for(let i = 0 ; i<purchases.length ; i++){
    //   purchasecourseId.push(purchases[i].courseId)
    // }

    const courseData = await courseModel.find({
      _id:{$in:purchases.map(x=>x.courseId)}
    })

  res.json({
    purchases,
    courseData
    // purchasecourseId
  });
});

module.exports = {
  userRouter: userRouter,
};

//1;33