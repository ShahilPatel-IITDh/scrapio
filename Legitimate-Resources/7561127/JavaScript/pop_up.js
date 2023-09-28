(function() {
    let front_desk = document.querySelector('body .container.kv-main');
    let backstage = document.querySelector('.content-wrapper');
    let body_main = front_desk ? front_desk : backstage;
    if (localStorage.getItem('announcement') !== '1') {
        const pop_up_style = document.createElement('style');
        pop_up_style.innerHTML = `
.kv-main{
    margin-top:145px;
}
.container.kv-main .pop-up-warp{
    padding: 0;
}
.pop-position{
    position: fixed;
    left: 0;
    right: 0;
    top: 57px;
    z-index: 1016;
}
.pop-up{
    background: #f4d45d;
    position: relative;
    padding: 10px 20px;
    font-size: 16px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6a5400;
    width: 100%;
}
.pop-up p{
    margin: 0
}
.pop-up a::after{
    content: "ðŸ”—";
    margin-left: 5px;
    font-size: 12px;
    position: relative;
    top: -5px;
}
.pop-up-close:hover {color: #3bb4c8;}
.pop-up-close {
    transition: all .3s ease;
    font-size: 25px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-56%);
}
.dark .pop-up {
    background: #d1ecf1;
    color: #0c5460;
}
.dark .pop-up-close:hover {color: #3bb4c8;}
@media (max-width: 992px){
    .kv-main{
        margin-top:200px;
    }
    .pop-up p{
        font-size: 13px
    }
}`;
        const pop_up_warp = document.createElement('div');
        pop_up_warp.className = `pop-up-warp ${front_desk ? 'pop-position' : ''}`;
        const pop_up_tpl = document.createElement('div');
        pop_up_tpl.className = 'pop-up';
        pop_up_tpl.innerHTML = `<p>Due to network issues, users from China Mainland are unable to access SM.MS, we have added an alternate domain name <a href="https://smms.app/">smms.app</a>.</p>`;
        const close_tpl = document.createElement('span');
        close_tpl.className = 'pop-up-close';
        close_tpl.innerText = 'Ã—';
        close_tpl.onclick = function() {
            localStorage.setItem('announcement', '1');
            body_main.removeChild(pop_up_warp);
        };
        pop_up_tpl.append(pop_up_style);
        pop_up_tpl.append(close_tpl);
        pop_up_warp.append(pop_up_tpl);
        body_main.insertBefore(pop_up_warp, body_main.firstChild.nextElementSibling);
    }
})();