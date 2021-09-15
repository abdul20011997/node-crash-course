const express=require('express');
const blogController=require('../controller/blogController');
const isauth=require('../middleware/is-auth');

const router=express.Router();
router.get('/edit/:id',isauth,blogController.blog_edit);
router.get('/blogs',isauth,blogController.blog_index);
router.get('/blogs/create',isauth,blogController.blog_create);
router.post('/blogs/update',isauth,blogController.blog_update);
router.post('/blogs',isauth,blogController.blog_insert);
router.get('/blogs/:id',isauth,blogController.blog_singleblock)
router.delete('/blogs/:id',isauth,blogController.blog_delete)

module.exports=router;