const   l_zoom_img = document.querySelector("#l_zoom_img");
const   r_zoom_img = document.querySelector("#r_zoom_img");
const   test_header = document.querySelector("#test_header");
const   head_img = document.querySelector("#head_img");
const   saturn_img = document.querySelector("#saturn_img");
const   phone_img = document.querySelector("#phone_img");
const   zooming_speed = 0.02;
const   opacity_speed = 0.05;
let     l_zoom = 1.2;
let     r_zoom = 1.2;
let     opacity = 0;
var     scroll_pos = 0;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("wheel", (e)=> {
    window.setInterval(function(){
        scroll_pos = document.documentElement.scrollTop;
        console.log(scroll_pos);
    }, 1000);
    if (e.deltaY > 0 && scroll_pos >= 0 && scroll_pos <= 200 && l_zoom >= 1) {
        l_zoom_img.style.transform = `scale(${(l_zoom -= zooming_speed)})`;
        r_zoom_img.style.transform = `scale(${(r_zoom -= zooming_speed)})`;
    }
    else if (e.deltaY <= 0 && scroll_pos <= 500 && l_zoom < 1.2){
        l_zoom_img.style.transform = `scale(${l_zoom += zooming_speed})`;
        r_zoom_img.style.transform = `scale(${r_zoom += zooming_speed})`;
    }
    if (scroll_pos >= 300) {
        test_header.style.animationName = "fade_in_header2";
        test_header.style.animationDelay = "200ms";
        test_header.style.animationDuration = "1500ms";
        test_header.style.animationFillMode = "forwards";
    }
    if (e.deltaY > 0 && scroll_pos >= 300 && scroll_pos <= 1200 && opacity <= 1) {
        head_img.style.opacity = `${opacity += opacity_speed}`;
        saturn_img.style.opacity = `${opacity += opacity_speed}`;
        phone_img.style.opacity = `${opacity += opacity_speed}`;
    }
    else if (e.deltaY <= 0 && scroll_pos <= 1200 && opacity >= -1){
        console.error(opacity);
        head_img.style.opacity = `${opacity -= opacity_speed}`;
        saturn_img.style.opacity = `${opacity -= opacity_speed}`;
        phone_img.style.opacity = `${opacity -= opacity_speed}`;
    }
})
