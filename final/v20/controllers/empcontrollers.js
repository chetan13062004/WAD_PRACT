const Employee=require("../model/emp")

exports.addemp=async(req,res)=>{
    try{

        const empdet=new Employee(req.body);
        await empdet.save();

        res.status(200).json({message:"Added "});

    }catch(err){
        console.log(err)
    }
}

exports.getall=async(req,res)=>{
    try{
        const allemp=await Employee.find();
        res.json(allemp);

    }catch(err){
        console.log(err)
    }
}

exports.updateEmployee=async(req,res)=>{
    try{
        const updateemp=await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updateemp);
    }
    catch(err){
        console.log(err);
    }
}