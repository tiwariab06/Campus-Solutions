const express = require('express')

const app = express();
app.use(express.urlencoded({extended:false}));

// upload file 
app.post('/upload',upload.single('fileUrl'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.send("Sucessful");
})
module.exports=