import { Account } from "./account.js"
import {FileManager} from "./FileManager.js"
let console = {
    mView: document.querySelector("#prompt"),
    connect(){
        console.mView.parentNode.style.display = "flex"
        console.socket = io()
        console.socket.on("output", message=>{
            console.mView.value += message
        })
        document.querySelector(".leftbtn").onclick = ()=>{
            console.mView.parentNode.style.display = "none"
            document.querySelector(".leftbtn").onclick = console.connect
        }
    },
    send(){
        console.socket.emit("command", {uid:Account.vkid, fname: FileManager.active.name})
    }
}

document.querySelector(".leftbtn").onclick = ()=>{
    console.connect()
    console.send()
}
