const mongoose = require("mongoose");
const {Schema}  = mongoose.Schema;


const userSchema = Schema({

})

const adminSchema = Schema({
    
})

const courseSchema = Schema({
    
})

const purchaseSchema = Schema({
    
})

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

