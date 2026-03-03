const express = require("express");
const mongoose = require("mongoose");
const {userRouter} = require("./route/user");
const {courseRouter} = require("./route/course");
const {adminRouter}  = require("./route/admin")
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    
console.log("Listening on port 3000")
}
main()


//  1:30
