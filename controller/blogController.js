const Blog=require('../models/blogs');

const blog_index=(req,res)=>{
    let page=1;
    if(req.query.page){
     page=parseInt(req.query.page);
    }
    const limit=2;
    Blog.find().sort({createdAt:-1}).limit(limit).skip((page - 1) * limit)
    .then(result=>{
    res.render('index',{title : 'Home Page',blogs:result});
    })
    .catch(err=>{
        console.log(err);
    })
}
const blog_create=(req,res)=>{
    res.render('createblog',{title : 'Create a Blog Page'})
}
const blog_insert=(req,res)=>{
    const data={
        title:req.body.title,
        snippets:req.body.snippets,
        body:req.body.body,
        image:req.file.filename
    }
    const blog=new Blog(data);
    blog.save()
    .then(result=>{
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err)
    })
}
const blog_singleblock=(req,res)=>{
    console.log(req.params.id);
    Blog.findById(req.params.id)
    .then(result=>{
        res.render('detail',{title:'Blog Detail',blog:result});
    })
    .catch(err=>{
        // console.log(err)
        res.status(404).render('404',{title : '404 Page'});
    })
}
const blog_delete=(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.json({
            redirect:'/'
        })
    })
    .catch(err=>{
        console.log(err)
    })
};
const blog_edit=(req,res)=>{
    Blog.findById(req.params.id)
    .then(result=>{
        res.render('edit',{title:'Blog Edit',blog:result});
    })
    .catch(err=>{
        // console.log(err)
        res.status(404).render('404',{title : '404 Page'});
    })
}
module.exports={blog_index,blog_create,blog_insert,blog_singleblock,blog_delete,blog_edit}