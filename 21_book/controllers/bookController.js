const Book=require("../models/bookModel")


exports.addbook=async(req,res)=>{
        try{
            const newbook=new Book(req.body);
            await newbook.save();
            res.status(200).json({message:"Success"})
        }catch(err){
            console.log(err)
        }
}

exports.getBook = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch books" });
    }
};

exports.updateBook=async(req,res)=>{
    try{

        const updatebook=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatebook);
    }
    catch(err){
        console.log(err)
    }
}


exports.getOne=async(req,res)=>{
    try{
    const books=await Book.findById();
    res.json(books);
    }
    catch(err){
        console.log(err)
    }
}