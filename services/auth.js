const jwt=require('jsonwebtoken');
const serect="pra@123soon";

function generateToken(user){
    const payload={
        _id:user._id,
        username:user.username,
        email:user.email
    }
    const token=jwt.sign(payload,serect,{expiresIn:'1h'});
    return token;
}

function verifyToken(token){
    const user=jwt.verify(token,serect);
    return user;
}

module.exports={
    generateToken,
    verifyToken
}