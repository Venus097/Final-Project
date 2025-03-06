console.log("JS file is loaded");

function showDropdown(){
    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    
}
document.getElementById("dropdownBtn").addEventListener("click", showDropdown);
 
// window.addEventListener("click", () =>{
//   let dropdown = document.getElementById("dropdownContent");
//   if(dropdown.style.display === "block"){
//     dropdown.style.display = "none";
//   }
// });





// audio  feature


  
let audio = new Audio("/FinalProject/chessGallery/piano.mp3");
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







// get daily puzzle and add its DOM 
document.addEventListener("DOMContentLoaded", async () => {
  
    const response = await fetch("https://api.chess.com/pub/puzzle");
    if (!response.ok) throw new Error("Failed to fetch puzzle");

    const data = await response.json();

    const puzzleContainer = document.getElementById("daily-puzzle");
    puzzleContainer.innerHTML = `
       
      <img src="${data.image}"  alt="Daily Chess Puzzle">
      
      <div id="puzzleDetails"> 
      <h2>• ${data.title} •</h2>
        <p>Train you brain with everyday puzzles, "daily" is there for you when you need it. Click the
            link to play the puzzle on chess.com.
        </p>
        
        <p><a href="${data.url}" target="_blank">Solve on Chess.com</a></p>
      </div> 
      <div class="GrowDiv"></div>`;
      document.getElementById("loadingPuzzle").style.display = "none";
});



// for the search profile feature 
const form = document.getElementById("searchProfile");
form.addEventListener("submit", function (e) {
  e.preventDefault();  
  fetchProfile();  
});
const errorMessage = document.getElementById("errMsg");

 
function fetchProfile() {
  const username = document.getElementById("chess-username").value.trim();
   
  if (username === "") {
    showErrorMessage("You Can't submit an empty response!");
    return;  
  }

  // Fetch the user's profile
  fetch(`https://api.chess.com/pub/player/${username}`)
    .then(response => {
      if (!response.ok) {
        showErrorMessage("User not found, check for any spelling errors.");
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    })
    .then(data => {
      displayProfile(data);
    });

  // Fetch the user's game stats
  fetch(`https://api.chess.com/pub/player/${username}/stats`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      return response.json();
    })
    .then(data => {
      displayStats(data);
    });
}

// Function to show error message
function showErrorMessage(message) {
  errorMessage.innerText = message;
  errorMessage.classList.remove("hide");  
  setTimeout(() => {
    errorMessage.classList.add("hide"); // Hide after 5 seconds
  }, 5000);
}


// function to display the user's profile  

function displayProfile(data){   
  const profileSection = document.getElementById("profile-section");
  profileSection.classList.contains("hide") ? profileSection.classList.remove("hide") : null;


  const userName = document.getElementById("userName");
  const userStatus = document.getElementById("userStatus");
  const userVerified = document.getElementById("userVerified");
  const userLeague = document.getElementById("userLeague");
  const userStreamer = document.getElementById("userStreamer");
  const userCountry = document.getElementById("userCountry");
  const userFollowers = document.getElementById("userFollowers");
  const userPic = document.getElementById("userPic");

  userName.innerText = data.name || "N/A";
  userStatus.innerText = `Status: ${data.status || "N/A"}`;
  userVerified.innerText = `Verified: ${data.verified ? "Yes" : "No"}`;
  userLeague.innerText = `League: ${data.league || "N/A"}`;
  userStreamer.innerText = `Streamer: ${data.is_streamer ? "Yes" : "No"}`;
  userCountry.innerText = `Country: ${data.country || "N/A"}`;
  userFollowers.innerText = `Followers: ${data.followers || 0}`;  
  userPic.src = data.avatar || "default-avatar-url";
}

 

// function to display the user's stats

function displayStats(data){

  // adding details for the daily 
  document.getElementById("chessDaily").innerHTML =`
  <h3>Chess Daily</h3>
  <p><strong>Last Rating:</strong> ${data.chess_daily.last.rating}</p>
  <p><strong>Best Rating:</strong> ${data.chess_daily.best.rating} (<a href="${data.chess_daily.best.game}">Game</a>)</p>
  <p><strong>Record:</strong> ${data.chess_daily.record.win} Win(s), ${data.chess_daily.record.loss} Losse(s), 
  ${data.chess_daily.record.draw} Draw(s)</p>
  `;

  // adding details for the daily 960  
  document.getElementById("chessDaily960").innerHTML =`
  <h3>Chess960 Daily</h3>
  <p><strong>Last Rating:</strong> ${data.chess960_daily.last.rating}</p>
  <p><strong>Best Rating:</strong> ${data.chess960_daily.best.rating} (<a href="${data.chess960_daily.best.game}">Game</a>)</p>
  <p><strong>Record:</strong> ${data.chess960_daily.record.win} Win(s), ${data.chess960_daily.record.loss} Losse(s), 
  ${data.chess960_daily.record.draw} Draw(s)</p>
  `;
  
  // adding details for the rapid 
  document.getElementById("chessRapid").innerHTML =`
  <h3>Chess Rapid</h3>
  <p><strong>Last Rating:</strong> ${data.chess_rapid.last.rating}</p>
  <p><strong>Best Rating:</strong> ${data.chess_rapid.best.rating} (<a href="${data.chess_rapid.best.game}">Game</a>)</p>
  <p><strong>Record:</strong> ${data.chess_rapid.record.win} Win(s), ${data.chess_rapid.record.loss} Losse(s), 
  ${data.chess_rapid.record.draw} Draw(s)</p>
  `;

  // adding details for the bullet 
  document.getElementById("chessBullet").innerHTML =`
  <h3>Chess Bullet</h3>
  <p><strong>Last Rating:</strong> ${data.chess_bullet.last.rating}</p>
  <p><strong>Best Rating:</strong> ${data.chess_bullet.best.rating} (<a href="${data.chess_bullet.best.game}">Game</a>)</p>
  <p><strong>Record:</strong> ${data.chess_bullet.record.win} Win(s), ${data.chess_bullet.record.loss} Losse(s), 
  ${data.chess_bullet.record.draw} Draw(s)</p>
  `;
  
  // adding details for the blitz 
  document.getElementById("chessBlitz").innerHTML =`
  <h3>Chess Blitz</h3>
  <p><strong>Last Rating:</strong> ${data.chess_blitz.last.rating}</p>
  <p><strong>Best Rating:</strong> ${data.chess_blitz.best.rating} (<a href="${data.chess_blitz.best.game}">Game</a>)</p>
  <p><strong>Record:</strong> ${data.chess_blitz.record.win} Win(s), ${data.chess_blitz.record.loss} Losse(s), 
  ${data.chess_blitz.record.draw} Draw(s)</p>
  `;
  
  // adding details for the puzzles 
  document.getElementById("chessPuzzles").innerHTML =`
  <h3>Puzzles & Tactics</h3>
  <p><strong>Highest Rating:</strong> ${data.tactics.highest.rating}</p>
  <p><strong>Lowest Rating:</strong> ${data.tactics.lowest.rating}</p>  
  `;

  // adding details for the puzzle rush 
  document.getElementById("chessPuzzleRush").innerHTML =`
  <h3>Puzzle Rush</h3>
  <p><strong>Best Score:</strong> ${data.puzzle_rush.best.score} (out of ${data.puzzle_rush.best.total_attempts} attempts)</p>
  `;
}

 

 