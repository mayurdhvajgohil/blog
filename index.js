require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodoverride = require("method-override")
const adminroute = require('./route/admin.js')
const router = require("./route/home.js")
const cookieParser = require("cookie-parser")
const mongoStore = require("connect-mongo")
const session = require('express-session')
const jwtsecret = process.env.JWTSECRET


const connectionDB  = require("./db.js")
connectionDB()



const port = process.env.port  || 3004
app.use(methodoverride('_method'))

app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs');

// jasson
app.use(express.json())

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))


app.use("/",router)
app.use("/", adminroute)

app.listen(port, ()=>{
    console.log("connected to : ", port)
})