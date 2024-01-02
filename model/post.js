const mongoose= require("mongoose")

const postSchema  = mongoose.Schema({
title:{
    type: String,
    require: true,
},
body:{
    type: String,
    require: true,
},
createdAt:{
    type:Date,
    default:Date.now

},
updatedAt:{
    type:Date,
    default:Date.now
}

},{timeStamp:true})

const Post = mongoose.model("Post", postSchema);


module.exports = Post