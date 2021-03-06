const Blog=require('../models/blogs');
const fs=require('fs');
const blog_index=(req,res)=>{
    let page=1;
    if(req.query.page){
     page=parseInt(req.query.page);
    }
    const limit=2;
    Blog.find().populate('user').sort({createdAt:-1}).limit(limit).skip((page - 1) * limit)
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
        image:req.file.filename,
           user:req.user
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
    Blog.findById(req.params.id).populate('user')
    .then(result=>{
        res.render('detail',{title:'Blog Detail',blog:result,userId:req.user});
    })
    .catch(err=>{
        // console.log(err)
        res.status(404).render('404',{title : '404 Page'});
    })
}
const blog_delete=(req,res)=>{
    Blog.findById(req.params.id).then(data=>{
        fs.unlink('./public/uploads/'+data.image,err=>{
            console.log(err)
        })
        return Blog.findByIdAndDelete(req.params.id);
    })
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
const blog_update=(req,res)=>{
    Blog.findById(req.body.id).then(data=>{
        data.title=req.body.title;
        data.snippets=req.body.snippets;
        data.body=req.body.body;
        if(req.file){
            fs.unlink('./public/uploads/'+data.image,(err)=>{
                console.log(err)
            })
            data.image=req.file.filename;
        }
        return data.save();

    })
    .then((data)=>{
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err)
    })

}
const blog_search=(req,res)=>{
    console.log(req.body);
    let page=1;
    if(req.query.page){
     page=parseInt(req.query.page);
    }
    const limit=2;
    Blog.find({title:{$regex:req.body.search,$options:'i'}}).populate('user').sort({createdAt:-1}).limit(limit).skip((page - 1) * limit)
    .then(result=>{
    res.render('index',{title : 'Home Page',blogs:result});
    })
    .catch(err=>{
        console.log(err);
    })
}
module.exports={blog_index,blog_create,blog_insert,blog_singleblock,blog_delete,blog_edit,blog_update,blog_search}