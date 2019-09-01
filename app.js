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
app.use("/getRelease", (_, res)=>{
    let release = {
        ver: "0.1 beta",
        src: "https://github.com/Orfund/dulang/archive/v0.1-beta.zip"
    }
    res.send(release)
})
app.use("/join", (_, res)=>{
    res.sendFile(__dirname+"/joinpage.html")
});
app.use("/apply", (req, res)=>{
    let vkid = req.query.id
    let role = req.query.role
    let message = `Новая заявка: ${vkid} ${role}`
    let token = "58869ef8f5b501015d6d84be9a17eb3f252f984aebbdaef49e2cfb97be1404d849da4c8574b9ee8b7fefa"
    https.get(encodeURI(`https://api.vk.com/method/messages.send?user_id=491569002&v=5.101&random_id=${Math.random()*5000}&message=${message}&access_token=${token}`))
    res.send("200 Ok")
})
app.use("/", (_, res)=>{
    res.sendFile(__dirname+"/landing.html")
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);