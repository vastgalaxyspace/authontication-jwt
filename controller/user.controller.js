// const usercontroller =require('./routes/user.router');
const User=require('../model/model');
const usercontroller={};
usercontroller.registeruser=async (req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username.trim() || !email.trim() || !password.trim()){
        return res.status(400).send("all field is required");}
    else if(password.length<4){
        return res.satus(400).send("password is short");
    }
    try{
        const existuser=await User.findOne({email}).lean().exec();
        if(existuser){
            return res.status(400).send("user already exist");
        }
        const user=await User.create({username,email,password});
        if(!user){
            return res.status(400).send("something went wrong");
        }else{
            return res.status(201).send("user created successfully");}
    }catch(err){
        return res.status(500).send("something went wrong");
    }
    return res.redirect("/");
};
usercontroller.loginuser=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email.trim() || !password.trim()){
        return res.status(400).send("all field is required");
    }
    try{
        const token=await User.matchpasswordandgeneratetoken(email,password);
        return res.cookie("token",token,{httpOnly:true}).send("login successfully").redirect("/");
    }catch(error){
        return res.render("login",{error:"invalid email or password"});
    }
    
};
module.exports=usercontroller;