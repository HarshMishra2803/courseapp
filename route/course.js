const {Router}  = require("express");
const { usermiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");
const {courseModel} = require("../db")

const courseRouter = Router();

courseRouter.post("/purchase",usermiddleware,async(req,res)=>{

    // we would except the user to pay the money

    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"You have suucesfully bought the course"
    })
})

courseRouter.get("/preview",async(req,res)=>{

    const courses = await courseModel.find({})

    res.json({
        message:courses
    })
})

module.exports = {
    courseRouter : courseRouter
}