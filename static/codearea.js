let editor = document.querySelector(".codewrapper textarea")
let overlay = document.querySelector(".overlay > div")
function on_input(e){
    let keyCode = e.keyCode || e.which;
    if (keyCode === 9) {
        e.preventDefault();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start)
                + "\t"
                + editor.value.substring(end);

        editor.selectionStart =
        editor.selectionEnd = start + 1
        
    }
    if(e.key === "{"){
        e.preventDefault()
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let indentation = 0
        for(let strpos = 1 + editor.value.lastIndexOf("\n"); editor.value.charAt(strpos)==" " || editor.value.charAt(strpos)=="\t";  strpos++){
            if(editor.value.charAt(strpos)==" ")
                indentation += 0.25;
            if(editor.value.charAt(strpos)=="\t")
                indentation += 1
        }
        editor.value = editor.value.substring(0, start)
                + `{\n${"\t".repeat(indentation + 1)}\n${"\t".repeat(indentation)}}`
                + editor.value.substring(end);
        editor.selectionStart =
        editor.selectionEnd = start + `{\n${"\t".repeat(indentation + 1)}`.length
        editor.oninput()
    }
    if(e.key ==="(" || e.key ==="[" || e.key ==="\""){
        let str_rep = "(  )"
        if(e.key === "[")
            str_rep = "[  ]"
        if(e.key ==="\"")
            str_rep = "\"\""
        e.preventDefault()
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start)
            + str_rep
            + editor.value.substring(end);
        editor.selectionStart =
        editor.selectionEnd = start +str_rep.length/2
        editor.oninput() 
    }
}
editor.onkeydown = on_input
editor.onsroll = function(e){
    overlay.scrollTop = editor.scrollTop;
}
editor.oninput = function(){
    overlay.innerHTML = editor.value
    overlay.innerHTML = overlay.innerHTML.replace(/\d+|\".*\"|true|false/gm, `<span class="literal">$&</span>`)
    overlay.innerHTML = overlay.innerHTML.replace(/\n/g, "<br>")
    overlay.innerHTML = overlay.innerHTML.replace(/(if|while|write|else|{|}|this|fun|or|and|not|async|import|for|in|return|@)/g, `<span class="keyword">$&</span>`)
}

let term = document.querySelector(".term")
let runbtn = document.querySelector(".codewrapper > svg")
runbtn.onclick = function(){
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/exec")
    xhr.setRequestHeader("Content-type", "text-plain")
    xhr.onload = ()=>{
        term.style.display = "flex"
        term.innerHTML = xhr.responseText.replace(/\n/g, "<br>")
    }
    xhr.send(editor.value)
}
editor.oninput()