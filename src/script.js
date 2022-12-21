const   zoom_img = document.getElementsByClassName("zoom_img");
const   test_header = document.querySelector("#test_header");
const   player_page = document.querySelector("#player_page");
const   partners_text = document.querySelector("#text");
const   test_img = document.getElementsByClassName("test_img");
const   who_button = document.querySelector("#who_button");
const   partners_logo = document.getElementsByClassName("partners_logo");

const   musics = [
    {
        artist: "Hamza",
        image: "../media/hamza_img.webp",
        music: "",
        duration: "01:40"
    },
    {
        artist: "Lefa",
        image: "../media/lefa_img.webp",
        music: "",
        duration: "03:12"
    },
    {
        artist: "LuvResval",
        image: "../media/luvresval.webp",
        music: "",
        duration: "01:00"
    }
];

let     is_on = false;
let     zoom = 1.2;
let     opacity = 0;
var     scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight);

// Scroll to the top after every refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
    const   current_scroll = window.pageYOffset;
    const   scroll_pos = current_scroll / scrollMaxY;
    //console.log(opacity);
    console.log(scroll_pos);
    if (scroll_pos <= 0.15) {
        zoom = 1.2 - ((current_scroll / 300) / 5);
    }
    zoom_img[0].style.transform = `scale(${zoom})`;
    zoom_img[1].style.transform = `scale(${zoom})`;

    if (scroll_pos >= 0.30) {
        test_header.style.animationName = "fade_in_header2";
        test_header.style.animationDelay = "300ms";
        test_header.style.animationDuration = "1500ms";
        test_header.style.animationFillMode = "forwards";
    }
    if (scroll_pos >= 0.17 && scroll_pos <= 0.9) {
        opacity = ((current_scroll) / (scrollMaxY - 300) - 0.3);
    }
    test_img[0].style.opacity = opacity;
    test_img[1].style.opacity = opacity;
    test_img[2].style.opacity = opacity;

        if (scroll_pos >= 0.8) {
        partners_text.style.animationName = "partners_animation";
        partners_text.style.animationDelay = "200ms";
        partners_text.style.animationDuration = "1500ms";
        partners_text.style.animationFillMode = "forwards";
        for(let i = 0; partners_logo[i]; i++) {
            partners_logo[i].style.animationName = "partners_animation";
            partners_logo[i].style.animationDuration = "1500ms";
            partners_logo[i].style.animationFillMode = "forwards";
        }
    }
});

who_button.addEventListener("click", (e) => {
    e.preventDefault();
    var   fade_bg = document.createElement("div");
    is_on = is_on ? false : true;
    if (is_on) {
        fade_bg.id = "fade_bg";
        document.body.appendChild(fade_bg);
        player_page.style.display = "inherit";
        fade_bg.addEventListener("click", (e) => {
            is_on = false;
            document.body.removeChild(document.getElementById("fade_bg"));
            player_page.style.display = "none";
        });
    } 
    else {
        document.body.removeChild(document.getElementById("fade_bg"));
    }
    console.log(is_on);
});