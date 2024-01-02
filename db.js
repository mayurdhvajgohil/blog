const mongoose = require("mongoose");

const connectionDB = async() => {
    try{
       const conn =  mongoose.connect(process.env.MONGO_URI,{family:4})
       console.log("database connected sucessfully")
    }
    catch(error) {
        console.log(error)
    }
}
module.exports = connectionDB
