const { Router } = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");

const JWT_ADMIN_PASSWORD = "sjfdgdjajdg";

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // hash the password

  await adminModel.create({
    email: email,
    password: password,
    firstName,
    lastName,
  });

  res.json({
    message: "signup succeeded",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const admin  = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
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


adminRouter.post("/course",(req,res)=>{
    res.json({
        message:"signin endpoint"
    })
})

adminRouter.put("/course",(req,res)=>{
    res.json({
        message:"signin endpoint"
    })
})

adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message:"signin endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}
