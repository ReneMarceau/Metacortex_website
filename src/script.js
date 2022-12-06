const   l_zoom_img = document.querySelector("#l_zoom_img")
const   r_zoom_img = document.querySelector("#r_zoom_img")
const   zooming_speed = 0.02;
let     l_zoom = 1.2;
let     r_zoom = 1.2;

document.addEventListener("wheel", (e)=> {
    if (e.deltaY > 0 && window.scrollY <= 200  && l_zoom >= 1) {
        l_zoom_img.style.transform = `scale(${(l_zoom -= zooming_speed)})`;
        r_zoom_img.style.transform = `scale(${(r_zoom -= zooming_speed)})`;
    }
    else if (e.deltaY <= 0 && window.scrollY <= 500 && l_zoom <= 1.2){
        l_zoom_img.style.transform = `scale(${l_zoom += zooming_speed})`;
        r_zoom_img.style.transform = `scale(${r_zoom += zooming_speed})`;
    }
})

document.addEventListener("wheel")