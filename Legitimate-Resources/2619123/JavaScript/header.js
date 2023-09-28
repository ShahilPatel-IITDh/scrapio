let menuHamburger = document.querySelector('.hamburger-menu');
let menuResp = document.getElementById('menuResp');
let closeMenuResp = document.getElementById('closeMenu');
let header = document.getElementById('header');
let headerResp = document.getElementById('headerResp');

const menuRespAccTriggers = document.querySelectorAll('.menu-accordion-trigger');

//Menu resp open
if(menuHamburger){
    menuHamburger.addEventListener('click', ()=>{
        menuResp.classList.add('menuRespOpen');
        document.body.style.position = 'fixed';
        document.body.style.top = 0;
        document.body.style.left = 0;
        document.body.style.right = 0;
    })
}

//Menu resp closes
if(closeMenuResp){
    closeMenuResp.addEventListener('click', ()=>{
        menuResp.classList.remove('menuRespOpen');
        document.body.style = '';
    })
}

//Inner menu accordions
if(menuRespAccTriggers.length > 0){

    menuRespAccTriggers.forEach(menuRespAccTrigger => {

        menuRespAccTrigger.addEventListener('click', function() {
        
            let  menuRespPanel = this.nextElementSibling;
         
            if(this.classList.contains('active')){
                this.classList.remove('active');
                menuRespPanel.style.maxHeight = null;

            } else {

                menuRespAccTriggers.forEach(item => {
                    let itemPanel = item.nextElementSibling;
                    item.classList.remove('active');
                    itemPanel.style.maxHeight = null;
                })

                this.classList.add('active');
                menuRespPanel.style.maxHeight = menuRespPanel.scrollHeight + "px"; 
            }

        })
    })    
}

//Header change color on scroll
if(header && !header.dataset.darkheader){
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50){
            header.classList.add('header-black');
        } else {
            header.classList.remove('header-black');
        }
    })
}

//Header resp change color on scroll
if(headerResp && !headerResp.dataset.darkheader){
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50){
            headerResp.classList.add('header-black');
        } else {
            headerResp.classList.remove('header-black');
        }
    })
}


//Open submenu on menu item hover
let subMenuTargets = document.querySelectorAll('.target-submenu');
let subMenus = document.querySelectorAll('.sub-menu');

if(subMenuTargets){
    subMenus.forEach(subMenu => {
        subMenu.addEventListener('mouseleave', function(){

            subMenu.classList.remove('active');

            subMenuTargets.forEach(target => {
                target.classList.remove('active');
            })

            if (window.scrollY < 50 && !header.dataset.darkheader){
                header.classList.remove("header-black");
            }
        })

        if (window.scrollY < 50 && !header.dataset.darkheader){
            subMenu.addEventListener('mouseenter', function(){
                header.classList.add("header-black");
            })
        }
    })

    subMenuTargets.forEach(target => {
        let subMenuID = target.dataset.menu;
        
        target.addEventListener('mouseover', function(){

            subMenus.forEach(subMenu => {
                subMenu.classList.remove('active');
            })

            subMenuTargets.forEach(target => {
                target.classList.remove('active');
            })

         let subMenu = document.getElementById(subMenuID);
         subMenu.classList.add('active');
         target.classList.add('active');
        })

    })
}

//adding dynamic top on submenu
if (subMenus && header){
    subMenus.forEach(subMenu => {
        subMenu.style.top = header.offsetHeight+'px'
    })
}

// Suite bento
let bentoOpenIcon = [... document.querySelectorAll('.ico-bento')]
let bentoCloseIcon = document.querySelector('#bento-close')
let bentoIcon = document.querySelector('#bento-icon')
let bentoMenu = document.querySelector('#bento-menu')

if(bentoOpenIcon){
    bentoOpenIcon.map((icon) => {
        icon.addEventListener('click', () => {
            bentoMenu.classList.add('transition')
            bentoMenu.classList.add('active')
        })
    })
}

if (bentoCloseIcon){
    bentoCloseIcon.addEventListener('click', () => {
        bentoMenu.classList.remove('active')
    })
}
if (bentoIcon){
    bentoIcon.addEventListener('click', () => {
        bentoMenu.classList.remove('active')
    })
}

if (bentoMenu){
    document.addEventListener('click', (event) => {
        if (!bentoMenu.contains(event.target) && !bentoOpenIcon.includes(event.target)){
            bentoMenu.classList.remove('active')
        }
    })
}

