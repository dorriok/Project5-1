const links = {
  button1: 'https://example.com/link1',
  button2: 'https://example.com/link2',
  button3: 'https://example.com/link3',
  button4: 'https://example.com/link4',
};




// Get all the button elements
const buttons = document.querySelectorAll('.button');

// Add event listeners to each button
buttons.forEach((button) => {
// Get the background color for this button
const bg = button.getAttribute('data-bg');

// Change the background color of the body when the button is hovered
button.addEventListener('mouseover', () => {
  document.body.style.backgroundColor = bg;
});

// Change the background color of the body back to white when the button is not hovered
button.addEventListener('mouseout', () => {
  document.body.style.backgroundColor = 'black';
});
});





function playAudio() {
var audio = document.getElementById("Anti Cockroaches Repellent Sound - 20kHz to 30kHz sound waves. #anticockroaches #chasecockroaches.mp3");
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






