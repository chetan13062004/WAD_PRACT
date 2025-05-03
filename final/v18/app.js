const express=require("express")
const mongoose=require("mongoose")
const song=require("./models/song");
const { urlencoded } = require("body-parser");

const app=express();

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/music2")
    .then(()=>console.log("connected"))
    .catch(err=>console.log(err))

app.get("/insert",async(req,res)=>{
    const songs = [
        {
          songname: "Tum Hi Ho",
          film: "Aashiqui 2",
          musicdirector: "Mithoon",
          singer: "Arijit Singh",
          actor: "Aditya Roy Kapur",
          actress: "Shraddha Kapoor"
        },
        {
          songname: "Kal Ho Na Ho",
          film: "Kal Ho Na Ho",
          musicdirector: "Shankar-Ehsaan-Loy",
          singer: "Sonu Nigam",
          actor: "Shah Rukh Khan",
          actress: "Preity Zinta"
        },
        {
          songname: "Channa Mereya",
          film: "ADHM",
          musicdirector: "Pritam",
          singer: "Arijit Singh",
          actor: "Ranbir Kapoor",
          actress: "Anushka Sharma"
        },
        {
          songname: "Tujh Mein Rab Dikhta Hai",
          film: "RNBDJ",
          musicdirector: "Salim-Sulaiman",
          singer: "Roop Kumar Rathod",
          actor: "Shah Rukh Khan",
          actress: "Anushka Sharma"
        },
        {
          songname: "Kun Faya Kun",
          film: "Rockstar",
          musicdirector: "A.R. Rahman",
          singer: "Mohit Chauhan",
          actor: "Ranbir Kapoor",
          actress: "Nargis Fakhri"
        }
      ];
      

    await song.insertMany(songs);
    res.send("Inserted 5 songs");
})

app.get("/",async(req,res)=>{
    const songs=await song.find();
    const count=await song.countDocuments();
    res.render("index",{songs,count});
})


app.get("/update/:name",async(req,res)=>{
  await song.updateOne(
    {songname:req.params.name},
    {$set:{actor:"abc",actress:"bcd"}}
  );
  res.send(`update song,${req.params.name}`)
})


app.listen(3000,()=>{
    console.log("Listen...");
})