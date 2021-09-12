const express=require('express');
const blogController=require('../controller/blogController');

const router=express.Router();
router.get('/edit/:id',blogController.blog_edit);
router.get('/blogs',blogController.blog_index);
router.get('/blogs/create',blogController.blog_create);
router.post('/blogs',blogController.blog_insert);
router.get('/blogs/:id',blogController.blog_singleblock)
router.delete('/blogs/:id',blogController.blog_delete)

module.exports=router;