const express = require("express");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const {userRouter} = require("./route/user");
const {courseRouter} = require("./route/course");
const {adminRouter}  = require("./route/admin")

const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",userRouter);
app.use("/api/v1/course",courseRouter);

app.listen(3000);