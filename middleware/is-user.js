const jwt=require('jsonwebtoken');
const User=require('../models/user');

const validateuser=(req,res,next)=>{
     const token=req.cookies.token;
    if(!token){
        res.locals.user=null;
        next();
    }
    else{
        jwt.verify(token,'secret',(err,data)=>{
            if(err){
                res.locals.user=null;
                next();
            }
            else{
                console.log(data);
                if(data){
                    User.findById(data.userid).then(user=>{
                        res.locals.user=user;
                next();
                        
                    })
                    .catch(err=>{
                        res.locals.user=null;
                         console.log(err)
                next();

                    })
                }

            }
        })
    }
    // const token=jwt.verify()
}
module.exports=validateuser;