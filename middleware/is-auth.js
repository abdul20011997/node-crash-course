const jwt=require('jsonwebtoken');

const validateToken=(req,res,next)=>{
     const token=req.cookies.token;
    if(!token){
        return res.redirect('/login');
    }
    else{
        jwt.verify(token,'secret',(err,data)=>{
            if(err){
                return res.redirect('/login');
            }
            else{
                console.log(data);
                req.user=data.userid;
                next();
            }
        })
    }
    // const token=jwt.verify()
}
module.exports=validateToken;