const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const cookieParser=require('cookie-parser');
const app=express();
const blogRoutes=require('./routes/blogRoutes');
const loginRoutes=require('./routes/loginRoutes');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ "-" + file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null,false);
        console.log('file format wrong');
      }
}
//connect mongo db
const dburri='mongodb+srv://Abdul:tw7hhuxFIIrG6zG7@nodetut.mdqox.mongodb.net/nodetut?retryWrites=true&w=majority';
mongoose.connect(dburri,{ useNewUrlParser:true, useUnifiedTopology:true})
.then(
    (result)=>{
        console.log("db connected")
   app.listen(4000);

    })
.catch((err)=>console.log(err));
app.set('view engine','ejs');
app.use(express.urlencoded({extended :true}));
app.use(multer({storage:storage,fileFilter : fileFilter}).single('image'))
app.use(express.static('public'));
app.use(cookieParser());

app.get('/',(req,res)=>{
  res.redirect('/blogs')

})
app.use(loginRoutes);
app.use(blogRoutes);
app.get('/about',(req,res)=>{
    res.render('about',{title : 'About Page'})

})
app.use((req,res)=>{
    res.status(404).render('404',{title : '404 Page'});

})