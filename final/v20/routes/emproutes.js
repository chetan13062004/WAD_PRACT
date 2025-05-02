const express=require("express")
const router=express.Router()
const controller=require("../controllers/empcontrollers")

router.post("/add",controller.addemp)
router.get("/get",controller.getall)
router.put("/:id",controller.updateEmployee);

module.exports=router