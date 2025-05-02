const mongoose=require("mongoose")

const empschema=new mongoose.Schema({
    "name":String,
    "department":String,
    "salary":Number
})

module.exports=mongoose.model("Employee",empschema)