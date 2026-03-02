const {Router}  = require("express");

const courseRouter = Router();

courseRouter.get("/purchase",(req,res)=>{
    res.json({
        message:"purchases endpoint"
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"preview  course"
    })
})

module.exports = {
    courseRouter : courseRouter
}