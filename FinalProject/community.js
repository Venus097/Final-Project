function showDropdown(){
    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    
}
document.getElementById("dropdownBtn").addEventListener("click", showDropdown);
 


  




// audio

let audio = new Audio("chessGallery/audio/piano.mp3");
const pauseBtn = document.getElementById("on_off");
let musicPlaying = false;

// pauses and resumes the playing time of the audio
function toggleAudio() { 
  audio.paused ? audio.play() : audio.pause();
  pauseBtn.innerText = audio.paused ? "⏵" : "⏸";
  musicPlaying = false ? true : false;
}


// stops the audio and resets time
function cutAudio() {
  audio.pause();
  audio.currentTime = 0;
  pauseBtn.innerText = "⏵";
  musicPlaying = false;
}


const musicLogo = document.getElementById('musiclogo');
const onOff = document.getElementById('on_off');
const stopAudio = document.getElementById('stopAudio');
let hiddenMusic = true;

// to display/hide the audio controls 
musicLogo.addEventListener('mouseover', function() {
  if (hiddenMusic){
    onOff.classList.toggle('togglemusic1');
    stopAudio.classList.toggle('togglemusic2');
    onOff.classList.toggle('togglemusic_down1');
    stopAudio.classList.toggle('togglemusic_down2');
    hiddenMusic = false;
  }else{
    onOff.classList.toggle('togglemusic1');
    stopAudio.classList.toggle('togglemusic2');
    onOff.classList.toggle('togglemusic_down1');
    stopAudio.classList.toggle('togglemusic_down2');
    hiddenMusic = true;
  }
});


// to save current audio time and resume playing it in case switched to another page
  
 
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("audioTime", audio.currentTime);
  sessionStorage.setItem("audioPlaying", !audio.paused);  
});

document.addEventListener("DOMContentLoaded", () => {
  let savedTime = parseFloat(sessionStorage.getItem("audioTime"));  
  let wasPlaying = sessionStorage.getItem("audioPlaying") === "true";  

  if (!isNaN(savedTime)) {  
    audio.currentTime = savedTime;  
    if (wasPlaying) {  
      audio.play();
    }
  }
});






// toggle in showing/hiding the video in community page
const videosObj = {
    1:"https://www.youtube.com/embed/qM4e7g2RukI?si=ZGlfkXEpQ4oYEU62",
    2:"https://www.youtube.com/embed/mtsabsZ4wG4?si=zII5i3FFrP4tcHYc",
    3:"https://www.youtube.com/embed/kK0cq6UBt1Y?si=PKH_JfU2O80XHldx",
    4:"https://www.youtube.com/embed/w5oq0uxLOIU?si=itdsNqyRWNr8YW91",
    5:"https://www.youtube.com/embed/49H728S_VjM?si=RN5U5ju9TrCkIHSy",
    6:"https://www.youtube.com/embed/dl8QE-M89FY?si=QbJpIRS2YcM7O5Zt",
    7:"https://www.youtube.com/embed/yfHdvxgBiDk?si=5vcrTQ9mAx_SVM64",
    8:"https://www.youtube.com/embed/rmbU97iftC8?si=gsZ0Jh8xOXSlCZPh",
    9:"https://www.youtube.com/embed/cbk4dRe0y_Y?si=KR0bP0yLqfP0bCys",
  
  }
  const stratDiv = document.getElementById("strategiesVidDiv"); 
  const stratVid = document.getElementById("strategiesVid");
  const closingTag = document.getElementById("closingTag"); 
  
  
  window.viewVideo = function (id){
    stratDiv.classList.toggle("hide");
    stratVid.src = videosObj[id];
  }
  
  closingTag.addEventListener("click", () => stratDiv.classList.toggle("hide"));
  
