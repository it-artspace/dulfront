let http    = require("http");
let https = require('https');
let launcher = require("child_process");
let fs      = require("fs");
let express = require("express");
const options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
};
const app = express();
app.use(express.static(__dirname));
app.use("/exec", (req, res)=>{
    let content = "";
    req.on("data", ch=>{
        content += ch
    });
    req.on("end", ()=>{
        fs.writeFileSync("main.dul", content);
        launcher.exec(`/root/Dulang/dulang launch ${__dirname}/main.dul`, (_, stdout, __)=>{
            console.log(_);
            console.log(__);
            res.send(stdout);
        });
    })
    
});
app.use("/", (_, res)=>{
    res.sendFile(__dirname+"/landing.html")
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);