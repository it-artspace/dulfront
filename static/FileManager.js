import { Account } from "./account.js" 
"use strict"
function dyn_elem(classname){
    let node = document.createElement("div")
    node.classList.add(classname)
    return node
}



function set_hover_color(color){
    this.onmouseover = ()=>{
        this.style.backgroundColor = color
    }
    this.onmouseout = ()=>{
        this.style.backgroundColor = null
    }
}

function setValue(val){
    this.value = val
    render_lineno(val.split("\n").length)
}

function request(path, callback=null, args = null){
    let xhr = new XMLHttpRequest()
    let param = path
    if(args != null){
        param += "?"+Object.entries(args).map(([k, v])=>{
            return k+"="+v
        }).join("&")
    }
    xhr.open("GET", param)
    xhr.onload = ()=>{
        callback(xhr.responseText)
    }
    xhr.send()
}

let CodeInput = document.getElementById("fcontent")
let File_node = document.querySelector(".fcontainer")
let File_new = document.querySelector(".fcontainer .add_file")
let File_name_input = document.querySelector(".fcontainer input")
let new_f_btn = document.querySelector(".fcontainer .aficwrapper")
new_f_btn.onmouseover = ()=>{
    File_name_input.style.display = "block"
    new_f_btn.style.display = "none"
    File_name_input.focus()
}



File_name_input.onkeydown = (e)=>{
    if(e.key == "Enter"){
        e.preventDefault()
        let name = File_name_input.value
        FileManager.add_item(name)
        File_name_input.value = ""
        File_name_input.style.display = "none";
        new_f_btn.style.display = "flex"
    }
}

File_name_input.onmouseout = ()=>{
    File_name_input.style.display = "none";
    new_f_btn.style.display = "flex"
}
let FileManager = {
    active:null,
    add_item(name){
        let node = dyn_elem("verttab")
        let fname = dyn_elem("main")
        let delim = dyn_elem("delimiter")
        fname.innerHTML = name
        node.name = name
        node.delim = delim
        node.appendChild(fname)
        node.appendChild(delim)
        node.onclick = ()=>{
            if(FileManager.active)
                FileManager.active.delim.removeAttribute("active")
            FileManager.active = node
            node.delim.setAttribute("active", "true")
            FileManager.get_file()
        }
        File_node.insertBefore(node, File_new)
    },
    get_file(){
        let name = this.active.name
        request("/getfile", answer=>setValue.call(CodeInput, answer), {uid:Account.vkid, name:name})
    },
    get_files(){
        request("/getfiles", (answer)=>{
            JSON.parse(answer).forEach(FileManager.add_item)
            FileManager.active = document.querySelector(".verttab")
            FileManager.active.delim.setAttribute("active", "true")
            FileManager.get_file()
        },{uid:Account.vkid})
    },
    save_file(){
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "/save_file")
        xhr.setRequestHeader('Content-type', 'text-plain')
        xhr.send(CodeInput.value)
    }
}

if(Account.valid_id()){
    FileManager.get_files()

} else {
    document.querySelector(".fcontainer input").style.display = "none"
}
let lineno_wrapper = document.querySelector(".lineno")

function render_lineno(count){
    while(lineno_wrapper.children.length > count){
        lineno_wrapper.children[lineno_wrapper.children.length - 1].remove()
        return
    }
    while(lineno_wrapper.children.length < count){
       let node = dyn_elem("lineno_item")
        node.innerHTML = lineno_wrapper.children.length + 1
        lineno_wrapper.appendChild(node)
        
    }

}
let mainblock = document.querySelector(".code")

let title = document.querySelector(".title")
title.onclick = ()=>{
    if(title.getAttribute("files_shown")=="true"){
        document.querySelector(".leftwrapper").style.display = "none"
        title.setAttribute("files_shown", "false")
        mainblock.style.zIndex = 1
    } else {
        document.querySelector(".leftwrapper").style.display = "flex"
        title.setAttribute("files_shown", "true")
        mainblock.style.zIndex = -1
    }
}

if(window.innerHeight > window.innerWidth){
    title.onclick()
    
    mainblock.style.position = "fixed"
    mainblock.style.top = "8vh"
    mainblock.style.left = 0
    mainblock.style.height = "100%"
    mainblock.style.width = "100%"
    
}
    

CodeInput.onkeydown = (e)=>{
    if(e.keyCode == 9){
        e.preventDefault()
        let start = CodeInput.selectionStart
        let end = CodeInput.selectionEnd
        CodeInput.value = CodeInput.value.substring(0, start) + "\t" + CodeInput.value.substring(end)
        CodeInput.selectionStart = 
        CodeInput.selectionEnd = start + 1
    }
    if(e.keyCode == 13 || e.keyCode == 8){
        let lineno = CodeInput.value.split("\n").length + 1
        render_lineno(lineno)
    }
}
let lineno = CodeInput.value.split("\n").length + 1
render_lineno(lineno)

CodeInput.onblur = ()=>{
    let content = CodeInput.value
    let name = FileManager.active.name
    let uid = Account.vkid
    let xhr = new XMLHttpRequest()
    xhr.open("POST", `/save_file?uid=${uid}&fname=${name}`)
    xhr.setRequestHeader('Content-type', 'text-plain')
    xhr.send(content)
}