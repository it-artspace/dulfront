

let role_container = document.querySelector(".roleselector")
let role_desc = document.querySelector(".roledesc")
let work_desc = document.querySelector("#work")
let roles_desc = [ 
    {
        title:"Разработчик компилятора",
        work: `Разработчик компилятора занимается добавлением фич в язык как в набор формальных правил. Именно он решает, какой синтаксис верный, а какой нет`,
        skills: [
            "Си: понимание наследования в-стиле-си, понимание устройства памяти (могу рассказать)",
            "Базовые алгоритмы и структуры данных"
        ],
        tech:[
            "C"
        ]
    },
    {
        title:"Разработчик среды исполнения",
        work: `Разработчик среды исполнения это именно тот человек, на котором завязана производительность и многое из того, что пользователь не видит. Потоки, например`,
        skills: [
            "Си: хорошее знание: понимание static/extern/volatile",
            "Представление о работе с многопоточностью: синхронизация, мьютексы и тд",
            "Базовые алгоритмы и структуры данных"
        ],
        tech:[
            "C"
        ]
    },
    {
        title:"Разработчик функциональности языка",
        work: `Разработчик функциональности языка разрабатывает интерфейс объекта каждого типа. В то время, как остальные знают, что он как-то реализован, он его реализует. Очень интересная задача, кстати`,
        skills: [
            "Си: хорошее знание, наследование в-стиле-си это просто минимум",
            "Знать внутренюю линковку программ на си",
            "Хорошее знание алгоритмов и структур данных"
        ],
        tech:[
            "C"
        ]
    },
    {
        title:"Разработчик инфраструктуры сайта",
        work: `Портал dulang.dev - очень технологически сложное решение. Запоминание сессий, работа с файлами, менеджмент индивидуальной Виртуальной Машины и прочее`,
        skills: [
            "Понимание как работают сайты - фронтенд и бэкенд",
            "Понимание функционирования UNIX, в частности - концепции файла"
        ],
        tech:[
            "C",
            "JS",
            "Python",
            "Dulang",
            "Kotlin (наверное)"
        ]
    }
]
roles_desc.forEach(
    role=>{
        let node = document.createElement("div")
        node.classList.add("role")
        node.innerHTML = role.title
        node.onclick = ()=>{
            work_desc.innerHTML = role.work
            for(let c of role_container.children)
                c.removeAttribute("selected")
            node.setAttribute("selected", "true")
            role_desc.innerHTML = ""
            role.skills.forEach(
                skill=>{
                    let skillNode = document.createElement("div")
                    skillNode.classList.add("role_skill")
                    skillNode.innerHTML = skill
                    role_desc.appendChild( skillNode )
                }
            )
        }
        role_container.appendChild( node )
    }
)



role_container.children[0].onclick()
let vkinput = document.querySelector(".mainscroller input")
vkinput.addEventListener("DOMActivate", ()=>{
    vkinput.value = "@"
})
function apply(){
    let xhr = new XMLHttpRequest()
    let role = document.querySelector(".role[selected=\"true\"]").innerHTML
    xhr.open("GET", `/apply?role=${role}&id=${vkinput.value}`)
    xhr.send()
    alert(`Ваша заявка на роль ${role} нами уже получена. В скором времени Вам напишут на оставленный контакт)`)
}
vkinput.onkeydown = (e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
        apply()
    }
}
document.querySelector(".actbtn").onclick = apply
