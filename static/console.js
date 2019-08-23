import { Account } from "./account.js"
let console = {
    mView: document.querySelector("#prompt"),
    connect(){
        console.mView.parentNode.style.display = "flex"
        console.socket = io()
        console.socket.on("output", message=>{
            console.mView.value += message
        })
        document.querySelector("#promptbtn").onclick = ()=>{
            console.mView.parentNode.style.display = "none"
            document.querySelector("#promptbtn").onclick = console.connect
        }
    },
    send(cmdString){
        console.socket.emit("command", {uid:Account.vkid, cmd: cmdString})
    }
}

document.querySelector("#promptbtn").onclick = console.connect
let cmdin = document.querySelector(".prompt_in")
cmdin.onkeydown = (e)=>{
    if(e.key == 'Enter'){
        e.preventDefault()
        console.send(cmdin.value)
        cmdin.value = ""
    }
}
