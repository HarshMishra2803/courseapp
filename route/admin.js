const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");

const {JWT_ADMIN_PASSWORD} = require("../config")

const adminRouter = Router();
const {adminmiddleware }= require("../middleware/admin");


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


adminRouter.post("/course",adminmiddleware,async(req,res)=>{

  const adminId = req.userId;
  
  const {title , description ,imageUrl , price} =req.body;

  const course =await courseModel.create({
    title:title,
    description,
    imageUrl ,
    price ,
    creatorId :adminId 
  })

    res.json({
        message:"course created",
        courseId :course._id
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
