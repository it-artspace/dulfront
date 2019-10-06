const fs = require("fs");
const path = require("path");
module.exports = {
walk:function w( dirname) {
    return fs.readdirSync(dirname).map(entry=>{
        let isDir = fs.statSync(path.join(dirname, entry)).isDirectory()
        if(isDir) {
            return {
                name: entry,
                type: "dir",
                children: w(path.join(dirname, entry))
            }
        } else {
            return {
                name:entry,
                type:"file"
            }
        }
    })
}};