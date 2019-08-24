let auth_widget = document.querySelector(".authwidget")

export let Account = {
    init(){
        this.update()
        if(!this.valid_id()){
            //try to push auth
            VK.init({apiId: 7080696})
            VK.Widgets.Auth("vk_auth", {"onAuth": data=>{
                document.cookie = "vkid="+data.uid + ";name="+data.first_name
                Account.update()
                auth_widget.style.display = "none"
            }})
            document.querySelector(".pseudo_auth").onclick = ()=>{
                document.cookie="vkid=temp;name="
                Account.update()
                auth_widget.style.display = "none"
                document.querySelector(".leftbtn#promptbtn").style.display = "none"
                document.querySelector(".leftwrapper > .delimiter").style.display = "none"
            }
            auth_widget.style.display = "flex"
        }
    },
    valid_id(){
        return !(this.vkid==0 || this.vkid == "temp")
    },
    update(){
        document.cookie.split('; ').map(x => x.split('=')).forEach(([k, v])=>{
            this[k] = v
        })
    },

}

Account.init()