const links = {
  button1: 'https://example.com/link1',
  button2: 'https://example.com/link2',
  button3: 'https://example.com/link3',
  button4: 'https://example.com/link4',
};










function playAudio() {
var audio = document.getElementById("Centipede Repellent Sound __ Suara pengusir kelabang.mp3");
audio.play();
}















var track = document.getElementById('track');

var controlBtn = document.getElementById('play-pause');

function playPause() {
  if (track.paused) {
      track.play();
      //controlBtn.textContent = "Pause";
      controlBtn.className = "pause";
  } else { 
      track.pause();
       //controlBtn.textContent = "Play";
      controlBtn.className = "play";
  }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
controlBtn.className = "play";
});




function goToPreviousPage() {
window.location.href = 'previous-page.html';
}

function goToNextPage() {
window.location.href = 'next-page.html';
}