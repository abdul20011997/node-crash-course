const express=require('express');
const loginController=require('../controller/loginController');

const router=express.Router();
router.get('/login',loginController.blog_login)
router.get('/register',loginController.blog_register)
router.post('/register',loginController.blog_insertuser)
router.post('/login',loginController.login_insertuser);
router.get('/logout',loginController.login_logout);


module.exports=router;