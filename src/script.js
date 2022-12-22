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
        image: "../public/media/hamza_img.webp",
        music: "../public/media/music.mp3"
    },
    {
        artist: "Lefa",
        image: "../public/media/lefa_img.webp",
        music: "../public/media/music.mp3"
    },
    {
        artist: "LuvResval",
        image: "../public/media/luvresval_img.webp",
        music: "../public/media/music.mp3"
    }
];

var artistImg = document.getElementsByClassName("artist_img");
var artistName = document.getElementsByClassName("artist_name");
var artistMusic = document.getElementsByClassName("artist_music");
for(let i = 0; i < artistName.length; i++){
    artistImg[i].src = musics[i].image;
    artistName[i].textContent = musics[i].artist;
    artistMusic[i].src = musics[i].music;
}

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
    //console.log(scroll_pos);
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
});

// Player

var audioPlayer = document.querySelectorAll('.player_music');
var playPause = audioPlayer.querySelectorAll('.playPause');
var playPauseBtn = audioPlayer.querySelectorAll('.fa-solid');
var slider = audioPlayer.querySelectorAll('.slider');
var progress = audioPlayer.querySelectorAll('.progress');
var player = audioPlayer.querySelectorAll('audio');
var currentTime = audioPlayer.querySelectorAll('.current-time');
var totalTime = audioPlayer.querySelectorAll('.total-time');

var draggableClasses = ['pin'];
var currentlyDragged = null;



window.addEventListener('mousedown', function(event) {
  
    if(!isDraggable(event.target)) return false;
    
    currentlyDragged = event.target;
    let handleMethod = currentlyDragged.dataset.method;
    
    this.addEventListener('mousemove', window[handleMethod], false);
  
    window.addEventListener('mouseup', () => {
      currentlyDragged = false;
      window.removeEventListener('mousemove', window[handleMethod], false);
    }, false);  
  });

playPauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function(){
  playPause.attributes.value = "M18 12L0 24V0";
  player.currentTime = 0;
  playPauseBtn.classList.remove("fa-pause");
  playPauseBtn.classList.add("fa-play");
});

let pin = slider.querySelector('.pin');
slider.addEventListener('click', window[pin.dataset.method]);

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if(direction == 'horizontal') {
    var min = rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;
  } else {
      var min = rect.top;
      var max = min + rangeBox.offsetHeight; 
    if(event.clientY < min || event.clientY > max) return false;  
  }
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  currentTime.textContent = formatTime(current);
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
    let slider = getRangeBox(event);
    let rect = slider.getBoundingClientRect();
    let K = 0;
    if(slider.dataset.direction == 'horizontal') {
      let offsetX = event.clientX - rect.x;
      let width = slider.clientWidth;
      K = offsetX / width;
    }
    console.log(event.clientX - rect);
    return K;
  }

function rewind(event) {
  if(inRange(event)) {
    //console.log((player.duration * getCoefficient(event)) - 15);
    player.currentTime = (player.duration * getCoefficient(event));
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

function togglePlay() {
  if(player.paused) {
    playPause.attributes.value = "M0 0h6v24H0zM12 0h6v24h-6z";
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    player.play();
  } else {
    playPause.attributes.value = "M18 12L0 24V0";
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
    player.pause();
  }  
}

function makePlay() {
  playPauseBtn.style.display = 'block';
}
