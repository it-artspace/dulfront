let http    = require("http")
let fs      = require("fs")
let express = require("express")

const app = express()
app.use(express.static(__dirname))
app.use("/", (_, res)=>{
    res.sendFile(__dirname+"/landing.html")
})
app.listen(3000)