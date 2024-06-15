const express=require('express');
const userrouter=express.Router();
const usercontroller=require('../controller/user.controller');
userrouter.route("/register").post(usercontroller.registeruser);
userrouter.route("/login").post(usercontroller.loginuser);



module.exports=userrouter;

