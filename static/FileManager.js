function dynElem(className){
    let node = document.createElement("div")
    node.classList.add(className)
    return node
}

// fobject is a json represented kinda {name:"", isDir:false, [children:[]]}
// not having children doesnt mean not being a directory
/* 
directory:
|--->dirhdr:
|    |--->svg as innerhtml   
|    |--->dirname
|
|--->dircontent:
|    |--->dirlcont:
|    |    |--->dirline
|    |
|    |--->dirmaincontent
|
|*-->contextmenu:
|    |--->new
|    |--->delete
|    |--->rename

file:
|--->svg (added via innerhtml?)
|--->filename


*/

let dirsvg  = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
let filesvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`


function createFileNode(fobject){
    if(fobject.isDir){
        let node    = dynElem("directory")
        let hdr     = dynElem("dirhdr")
        let content = dynElem("dircontent")
        let linecont= dynElem("dirlcont")
        let name    = dynElem("dirname")
        let line    = dynElem("dirline")
        let maincont= dynElem("dirmaincontent")
        name.innerText = fobject.name
        hdr.innerHTML += dirsvg;
        node.appendChild(hdr)
        node.appendChild(content)
        hdr.appendChild(name)
        maincont.setAttribute("closed", "true")
        hdr.onclick = ()=>{
            if(maincont.getAttribute("closed")){
                maincont.removeAttribute("closed")
            } else {
                maincont.setAttribute("closed", "true")
            }
        }
        content.appendChild(linecont)
        linecont.appendChild(line)
        content.appendChild(maincont)
        for(let childNode of fobject.children){
            maincont.appendChild( createFileNode( childNode ) )
        }
        return node
    } else {
        let node    = dynElem("file")
        node.innerHTML += filesvg
        let name    = dynElem("filename")
        name.innerText = fobject.name
        name.onclick = ()=>{
            //goto editor
        }
        node.appendChild(name)
        return node
    }
}

let testfs = {name:"project1", isDir:true, children:[
    {name:"src", isDir:true, children:[
        {name: "main.dul", isDir:false},
        {name: "test", isDir:true, children:[
            {name: "test1.dul", isDir:false}
        ]}
    ]},
    {name:"buildscript", isDir:false}
]}

document.getElementById("explorer").appendChild( createFileNode(testfs) )