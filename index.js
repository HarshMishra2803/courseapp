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


async function main(){
// await mongoose.connect("mongodb+srv://harshmishra2803_db_user:Harsh123@cluster0.ahlcdxl.mongodb.net/coursera-app");
app.listen(3000);
console.log("Listening on port 3000")
}
main()


//  1:30