const express=require("express")
const router=express.Router();
const controller=require("../controllers/bookController")

router.post("/add",controller.addbook)
router.get("/getbook",controller.getBook)
router.get("/getbook/:id",controller.getOne)
router.put("/:id",controller.updateBook)

module.exports=router