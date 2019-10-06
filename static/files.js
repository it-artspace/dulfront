"use-strict";
//это конечно модуль, но а что - а вдруг
const dirNodeTemplate = document.querySelector("#dirtemp").content.querySelector(".dircontainer");
const fileNodeTemplate = document.querySelector("#dirtemp").content.querySelector(".file");


let fsCreator = {
    dirNode:function(dirInfo){
        let node = document.importNode(dirNodeTemplate, true);
        node.name = node.querySelector(".dirname");
        node.name.innerText = dirInfo.name;
        node.content = node.querySelector(".dirchildren");
        node.contentWrapper = node.querySelector(".dircontent");
        node.querySelector(".dirhdr").onclick = function () {
            if(node.contentWrapper.getAttribute("expanded")==="true"){
                node.contentWrapper.removeAttribute("expanded")
            } else {
                node.contentWrapper.setAttribute("expanded", "true")
            }
        };
        for(let chNode of dirInfo.children){
            node.content.appendChild(
                //its kinda metaprogramming: we call function that matches type of the object
                //null-safety is provided by this (elvis) operator
                (fsCreator[chNode.type+"Node"] || ((_)=>{})) (chNode)
            )
        }
        return node;
    },
    fileNode:function (fileInfo){
        let node = document.importNode(fileNodeTemplate, true);
        node.name = node.querySelector(".fname");
        node.name.innerText = fileInfo.name;
        node.onclick = function () {
            document.querySelectorAll(".file")
                .forEach(e=>e.removeAttribute("selected"));
            node.setAttribute("selected", "true");
            getFileContent(node.name.innerText)
        };
        return node;
    }
};

function fetch_files(callback){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/getDir?uid=491569002`);
    xhr.onload = ()=>callback(JSON.parse(xhr.responseText));
    xhr.send()
}




fetch_files((res)=>{
    document.querySelector(".fcontainer").appendChild(fsCreator.dirNode(res));
});