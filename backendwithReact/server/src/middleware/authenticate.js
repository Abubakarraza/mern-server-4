const jwt=require('jsonwebtoken');
const User=require('../model/userSchema');
const authenticate = async(req,res,next) =>{
console.log('hello this is middleware');
try {
    const token= await req.cookies.woken;
    console.log(token)
    const verifyToken=await jwt.verify(token,process.env.PRIVATE_KEY);
    console.log(verifyToken);
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootUser){
    throw new Error('user is unauthorized');
};
req.token=token;
req.rootUser=rootUser;
req.userID=rootUser._id
    next();
} catch (error) {
    res.status(401).send("unauthorized:no token provided")
    console.log(error)
}
};
module.exports=authenticate;