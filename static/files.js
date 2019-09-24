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
                fsCreator[chNode.type+"Node"] || ((_)=>{}) (chNode)
            )
        }
        return node;
    },
    fileNode:function (fileInfo){
        let node = document.importNode(fileNodeTemplate, true);
        node.name = node.querySelector(".fname");
        node.name.innerText = fileInfo.name;
        node.onclick = function () {
            getFileContent(node.name.innerText)
        };
        return node;
    }
};


let directory = {
    type:"dir",
    name:"project1",
    children:[
        {
            type: "file",
            name: "main.dul"
        },
        {
            type:"dir",
            name:"src",
            children:[
                {
                    type:"file",
                    name:"func.dul"
                }
            ]
        }
    ]
};

document.querySelector(".fcontainer").appendChild(
    fsCreator.dirNode(directory)
);
