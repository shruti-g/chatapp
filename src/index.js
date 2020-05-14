const express=require("express");
const  path=require('path');//no need to install as it is global package


const app=express();

const port=process.env.PORT || 3000;

const publicDirectoryPath=path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
});
