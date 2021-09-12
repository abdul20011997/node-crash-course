const fs=require('fs');
const readstream=fs.createReadStream('./docs/data2.txt');
const writestram=fs.createWriteStream('./docs/data3.txt');


// readstream.on('data',(chunk)=>{
//     console.log('-------------New Chunk------------');
//     console.log(chunk)
//     writestram.write(chunk)
// })
readstream.pipe(writestram)