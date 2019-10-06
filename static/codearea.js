let editor = document.querySelector(".codewrapper textarea");
let overlay = document.querySelector(".overlay > div");
function on_input(e){
    console.log(e.key);
    let keyCode = e.keyCode || e.which;
    if (keyCode === 9) {
        e.preventDefault();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start)
            + "\t"
            + editor.value.substring(end);

        editor.selectionStart =
            editor.selectionEnd = start + 1;
        editor.oninput()
    }
    if(e.key === "{"){
        e.preventDefault();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let line_arr = editor.value.split("\n");
        let lineno = 0;
        let sym_count = 0;
        while(sym_count <= start && lineno < line_arr.length){
            sym_count += line_arr[lineno].length + 1;
            lineno++
        }
        lineno--;
        let indent_string = line_arr[lineno].match(/( |\t)*/)[0];
        editor.value = editor.value.substring(0, start)
            + `{\n${indent_string}\t\n${indent_string}}`
            + editor.value.substring(end);
        editor.selectionStart =
            editor.selectionEnd = start + `{\n${indent_string}\t`.length;
        editor.oninput()
    }
    if(e.key === "Enter"){
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        let line_arr = editor.value.split("\n");
        e.preventDefault();
        let lineno = 0;
        let sym_count = 0;
        while(sym_count <= start && lineno < line_arr.length){
            sym_count += line_arr[lineno].length + 1;
            lineno++
        }
        lineno--;
        let indent_string = `\n${line_arr[lineno].match(/( |\t)*/)[0]}`;
        if(line_arr[lineno].search(/(async|else|if|for|{|fun|while)/g)!=-1)
            indent_string += '\t';
        editor.value = editor.value.substring(0, start)
            + indent_string
            + editor.value.substring(end);
        editor.selectionStart =
            editor.selectionEnd = start + indent_string.length;
        editor.oninput()
    }
    if(e.key ==="(" || e.key ==="[" || e.key ==="\""){
        //расставляем закрывающую скобку сами
        let str_rep = "(  )";
        if(e.key === "[")
            str_rep = "[  ]";
        if(e.key ==="\"")
            str_rep = "\"\"";
        e.preventDefault();
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start)
            + str_rep
            + editor.value.substring(end);
        editor.selectionStart =
            editor.selectionEnd = start +str_rep.length/2;
        editor.oninput()
    }
    editor.clientHeight = editor.scrollHeight
}
editor.onkeydown = on_input;
editor.onsroll = function(e){
    overlay.scrollTop = editor.scrollTop;
};
editor.oninput = function(){
    overlay.innerHTML = editor.value;

    overlay.innerHTML = overlay.innerHTML.replace(/(?=[^\$])\d+|\"[^"]*\"|true|false/gm, `<span class="literal">$&</span>`)
        .replace(/\$\d+/gm, `<span class="fmt_st">$&</span>`)
        //then ones that don't
        .replace(/(?:(^|[^\w\"]))(this|fun|or|and|not|in)(?:([^\w\"]|$))/g, `<span class="keyword">$&</span>`)
        //firstly parse keywords that must start at begin of line
        .replace(/{|}/gm,`<span class="keyword">$&</span>`)
        .replace(/(?:(^|\t+))(if|while|write|else|async|import|for|return)/gm, `<span class="keyword">$&</span>`)
        //lets look for builtin functions
        .replace(/(object|array|channel|range|str|obdump|typeof)/g, `<span class="bin">$&</span>`)
        .replace(/(?:\.)(\w+)/gm, `<span class="bin">$&</span>`)
        .replace(/\#.*$/gm, `<span class="comment">$&</span>`)
        .replace(/\n/g, "<br>")
};

let term = document.querySelector(".term");
let runbtn = document.querySelector(".codewrapper > svg");
runbtn.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/exec");
    xhr.setRequestHeader("Content-type", "text-plain");
    xhr.onload = ()=>{
        term.style.display = "flex";
        term.innerHTML = xhr.responseText.replace(/\n/g, "<br>")
    };
    xhr.send(editor.value)
};
editor.oninput();