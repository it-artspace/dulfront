function textarea_check_sym(e){
    let keyCode = e.keyCode || e.which
    if (keyCode == 9) {
        e.preventDefault()
        let start = this.selectionStart
        let end = this.selectionEnd
        this.value = this.value.substring(0, start)
                + "\t"
                + this.value.substring(end)

        this.selectionStart =
        this.selectionEnd = start + 1
    }

    let lineno_wrapper = document.querySelector(".lineno")
    let num_lines = this.value.split("\n").length + 1
    var difference = lineno_wrapper.children.length - num_lines
    if(difference > 0){
        for(let i = lineno_wrapper.children.length; i>num_lines; --i){
            lineno_wrapper.children[i - 1].remove()
        }
    }
    while(difference < 0){
        let new_child = document.createElement("div")
        new_child.classList.add("lineno_widget")
        new_child.innerHTML = num_lines + difference + 1
        lineno_wrapper.appendChild(new_child)
        difference++
    }
    this.clientHeight = this.scrollHeight
    document.querySelector(".tawrapper").clientHeight = this.scrollHeight
}

function toggle_terminal(){
    let prompt = document.querySelector(".code .terminal")
    if(prompt.getAttribute("show")=="false"){
        document.getElementById("promptbtn").innerHTML = "close"
        prompt.style.display = "flex"
        prompt.setAttribute("show", "true")
        prompt.socket = io()
        prompt.socket.on("output", (message)=>{
            prompt.value += message
        })

    } else {
        document.getElementById("promptbtn").innerHTML = "connect"
        prompt.style.display = "none"
        prompt.setAttribute("show", "false")
        prompt.socket.close()
    }
    
}
function prompt_inp(event){
    if(event.key == "Enter"){
        this.parentNode.socket.emit("command", this.value)
        this.value = ""
    }
}
