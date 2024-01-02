const express = require("express")
const Post = require("../model/post.js")

const User = require("../model/user.js")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.get("/admin",(req,res)=>{
    res.render("admin")
})
router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/admin",async(req,res)=>{
    const userdata = {
     username : req.body.name,
     email : req.body.email,
     password : req.body.password
    }
    

    const existinguser = User.findOne({email : userdata.email})
    if(!existinguser){
        res.send("email id already registered")
       
    }
    else{
        const hashedPassword  = await bcrypt.hash(userdata.password,10)
        userdata.password = hashedPassword
        const registeruserdata = await User.insertMany(userdata)
        console.log(registeruserdata)
        res.redirect("/admin")
    }
    

})



router.get("/dashboard",(req,res)=>{
    res.render("../views/adminlayout/dashboard")
})
router.post("/login", async(req,res)=>{
    try{
        const { email, password }  = req.body;
        
        // console.log(check.password)
        const user = await User.findOne({ email})
       
        if(!user){
            res.send("email not found")
            
        }
        const convpass = await bcrypt.compare(password, user.password)
        if(!convpass){
            res.send("pass not matched")
        
        }
        res.redirect("/dashboard")
        
      ;

      return
      
      
    //   res.send("log in sus dashboard")

    }
    catch{
        res.send("wrong detail")
    }
})



module.exports = router
