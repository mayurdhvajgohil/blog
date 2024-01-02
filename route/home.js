// const mongose =  require("mongoose")
const express = require("express")
const Post = require("../model/post.js")
const router = express.Router()



router.get("/",async(req,res)=>{

    try{

        const data = await Post.find()
        res.render("home",{data})
    }
    catch(err){
      console.log(" data not found",err)
    }
    
})

router.get("/post/:id",async(req,res)=>{
    try{
        let id = req.params.id;
        const data = await Post.findById({ _id : id})
        res.render("postpage",{data})

    }
    catch(err){
        console.log("data not fetchh ", err)

    }
})

router.get("/contact",(req,res)=>{
    res.render("contact")
})







// function insertmany(){
//     Post.insertMany([
       
//      {
//             title:"one blog",
//             body:"this is one blog"


//     },
//     {
//         title:"three blog",
//         body:"this is three blog"


// },
// {
//     title:"two blog",
//     body:"this is two blog"


// }
// ])

// }

// insertmany()


// update 

router.get("/edit_post/:id",async(req,res)=>{

    try{

      const data =   await Post.findOne({_id:req.params.id
           
        })

        res.render('edit_post',{data})
    }
    catch(err){
      console.log(" data not found",err)
    }
    
})




router.put("/edit_post/:id",async(req,res)=>{

    try{

        await Post.findByIdAndUpdate(req.params.id,{
            title : req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })

        res.redirect(`/edit_post/${req.params.id}`)
    }
    catch(err){
      console.log(" data not found",err)
    }
    
})


// delete



router.delete("/delete_post/:id",async(req,res)=>{

    try{

        await Post.deleteOne({_id : req.params.id})
           

        res.redirect("/")
    }
    catch(err){
      console.log(" data not found",err)
    }
    
})








router.get("/about",(req,res)=>{
    res.render("about")
})

module.exports = router