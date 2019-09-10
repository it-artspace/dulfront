let editor = document.querySelector(".codewrapper textarea")
let overlay = document.querySelector(".overlay> div")
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
    
}
editor.onkeydown = on_input
editor.oninput = (e)=>{
    overlay.innerHTML = editor.value
    overlay.innerHTML = overlay.innerHTML.replace(/\n/g, "<br>")
    overlay.innerHTML = overlay.innerHTML.replace(/\d|\".*\"|true|false/g, `<span class="literal">$&</span>`)
    overlay.innerHTML = overlay.innerHTML.replace(/(if|while|write|else|object|this)/g, `<span class="keyword">$&</span>`)
}