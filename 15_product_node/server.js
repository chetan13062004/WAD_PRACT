const express=require("express")
const fs=require("fs")
const path=require("path")

const PORT=3000

const app=express();

app.use(express.static("public"))

app.get("/api/products",(req,res)=>{
    fs.readFile("products.json","utf-8",(err,data)=>{
        if(err){
           return  res.status(500).json({message:"Unable"});
        }

        const prod=JSON.parse(data);
        res.json(prod);
    })

})

app.listen(PORT,()=>{
    console.log("Listen....")
})