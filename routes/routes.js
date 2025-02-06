const express=require('express');
const router=express.Router();

router.get("/employees",(req,res)=>{
    res.send("All employees");
})

module.exports=router;