const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const validateerr=(err)=>{
    console.log(err.errors['name'].message);
    let newerrors={name:'',email:'',password:''}
    if(err.errors['name']){
        newerrors['name']=err.errors['name'].message;
        
    }
    if(err.errors['email']){
        newerrors['email']=err.errors['email'].message
    }

    return newerrors;
}
const blog_login=(req,res)=>{
    res.render('login',{title:'Login'})
}

const blog_register=(req,res)=>{
    res.render('register',{title:'Register'})
}
const blog_insertuser=(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const cpsw=req.body.cpsw;
    if(password!=cpsw){
        return console.log('password mismatch');
    }
    User.find({email:email}).then(user=>{
        if(user.length > 0){
          return console.log('user already there')  
        }
        bcrypt.hash(password,10).then(result=>{
            const user= new User({
                name:name,
                email:email,
                password:result
            })
            return user.save();
        }).then(data=>{
            return res.redirect('/login')
        }).catch(err=>{
            var errors=validateerr(err);
        
            
        })
    })
    .catch(err=>{
        console.log(err)
    })

}
const login_insertuser=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email})
    .then(user=>{
        console.log(user);
        if(!user){
            return console.log('email not found')
        }
        bcrypt.compare(password,user.password).then(result=>{
            if(!result){
               return console.log('password not match') 
            }
            const token=jwt.sign({userid : user._id},'secret',{expiresIn: 60 * 60 * 24 * 3});
            res.cookie('token',token,{maxAge : 3 * 24 * 3600000,httpOnly : true});
            return res.redirect('/');
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
const login_logout=(req,res,next)=>{
    res.cookie('token','',{maxAge:1});
    return res.redirect('/');
}
module.exports={blog_login,blog_register,blog_insertuser,login_insertuser,login_logout};