function checkauthonticationcookie(cookieName){
    return (req,res,next)=>{
        const tokencookievalue=req.cookies[cookieName];
        if(!tokencookievalue){
            return next();
        }
        try{
            const payload=verifyToken(tokencookievalue);
            req.user=payload;
            return next();
        }catch(err){
            return next();
        };

    }

}
module.exports=checkauthonticationcookie;