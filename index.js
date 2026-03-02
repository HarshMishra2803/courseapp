const express = require("express");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const app = express();
app.use(express);

app.post("/user/singup",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

app.post("/user/singin",(req,res)=>{
    res.json({
        message:"signin endpoint"
    })
})

app.get("/user/purchases",(req,res)=>{
    res.json({
        message:"purchases endpoint"
    })
})

app.get("/course/purchase",(req,res)=>{
    res.json({
        message:"purchases endpoint"
    })
})

app.get("/courses",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

app.listen(3000);