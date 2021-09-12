const fs=require('fs');
//read file
// fs.readFile('./docs/data.txt',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString())
// })


//write file
// fs.writeFile('./docs/data.txt','hello ninjas',(err)=>{
//     if(err){
//     console.log(err)
//     }
// })


//directory
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets',(err)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log('folder created');
//     })
// }
// else{
//     fs.rmdir('./assets',(err)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log('folder deleted')
//     })
// }


//delete file
if(fs.existsSync('./docs/deletefile.txt')){
    fs.unlink('./docs/deletefile.txt',(err)=>{
        if(err){
            console.log(err)
        }
        console.log('file deleted')
    })
}
