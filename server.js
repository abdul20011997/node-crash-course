const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log('server created');
    console.log(req.url,req.method);
    res.setHeader('Content-Type','text/html');
    let path="./views"
    switch(req.url){
        case '/':
            res.statusCode=200;
        path+='/home.html';
        break;
        case '/about':
            res.statusCode=200;
        path+='/about.html';
        break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
        default:
            res.statusCode=404;
        path+='/404.html';
        break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(data);
            res.end();
        }
    })

})

server.listen(4000,'localhost',()=>{
    console.log('lsitening the port 3000')
})