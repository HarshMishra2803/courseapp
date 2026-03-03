const jwt  = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} =  require("../config")


function adminmiddleware(req,res,next){

    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(decoded){
        req.userId = decoded.id;
        next;
    }else{
        res.status(404).json({
            message:"admin not signed in "
        })
    }
}

module.exports= {
    adminmiddleware : adminmiddleware
}