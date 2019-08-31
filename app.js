let http    = require("http")
let fs      = require("fs")
let express = require("express")
var options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
}
  
const app = express()
app.use(express.static(__dirname))
app.use("/", (_, res)=>{
    res.sendFile(__dirname+"/landing.html")
})
app.listen(80)
https.createServer(options, app).listen(443)