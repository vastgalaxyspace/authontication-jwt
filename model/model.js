const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const { createHmac, randomBytes } = require("crypto");
const {generatetoken} =require('../services/auth');
const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


    
},{timestamps:true});

userschema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) 
    return next();

    const salt=randomBytes(16).toString();
    const hash=createHmac('sha256',salt)
    .update(user.password)
    .digest('hex');

    this.salt=salt;
    this.password=hash;
    next();

});

userschema.static("matchpasswordandgeneratetoken",async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

      if(!hashedPassword===userProvidedHash) throw new Error("Invalid password");

      const token=generatetoken(user);
       return token;
    
    
    });
const User=mongoose.model('User',userschema);
module.exports=User;
