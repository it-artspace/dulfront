let editor = document.querySelector("#coder")
editor.onkeydown = (e)=>{
    let keyCode = e.keyCode || e.which
    if (keyCode == 9) {
        e.preventDefault()
        let start = editor.selectionStart
        let end = editor.selectionEnd
        editor.value = editor.value.substring(0, start)
                + "\t"
                + editor.value.substring(end)

        editor.selectionStart =
        editor.selectionEnd = start + 1
    }
}
let bmenu = document.querySelector(".bwrapper")
let boast = document.querySelector(".boast_selector")
boast.onmouseover = ()=>{
    bmenu.style.display = "flex"
}

let arguments_ = [
    ["", "no explicit self", "consize lambdas", "convinient singletons"],
    ["", "appropriate this", "no let-var-const", "no voodoo type casting"],
    ["", "up to 3 times less code", "convinient singletons"]
]
let base_arg = document.querySelector("#barg")
let selectors = document.querySelectorAll(".boast_selector")
for(let i = 0; i<arguments_.length; ++i){
    selectors[i].onmouseover = ()=>{
        selectors.forEach(e=>{
            e.removeAttribute("selected")
        })
        selectors[i].setAttribute("selected", "true")
        base_arg.innerHTML = arguments_[i].reduce(
            (acc, elem)=>{
                let node = document.createElement("div")
                node.classList.add("boast_arg")
                node.innerHTML = elem
                return acc + node.outerHTML
            }
        )
    }
}

document.querySelector("#comm").onclick = ()=>{
    window.location.href = "https://vk.com/dulangdev"
}
document.querySelector("#togit").onclick = ()=>{
    window.location.href = "https://github.com//Orfund/dulang"
}