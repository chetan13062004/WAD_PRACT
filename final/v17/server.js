const express=require("express")
const path=require("path")
const fs=require("fs");

const app=express();

app.use(express.static("public"))

app.get("/api/emp",(req,res)=>{

    fs.readFile("emp.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Unable"});
        }

        const empdet=JSON.parse(data);
        res.json(empdet);
    })

})

app.listen(3000,()=>{
    console.log("Listen...");
})