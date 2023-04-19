
  



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













*,
*:after,
*:before {
  box-sizing:border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-font-smoothing:antialiased;
  -moz-font-smoothing:antialiased;
  -o-font-smoothing:antialiased;
  font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
}

#playable .control { opacity: 0; /* transition: opacity .2s linear; */ }
#playable.not-started .play, #playable.paused .play { opacity: 1; }
#playable.playing .pause { opacity: 1; }
#playable.ended .stop {opacity: 1; }
#playable.precache-bar .done {opacity: 0; }

#playable.not-started .progress-bar, #playable.ended .progress-bar { display: none; }
#playable.ended .progress-track { stroke-opacity: 1; }

#playable .progress-bar,
#playable .precache-bar {
  stroke-dasharray: 298.1371428256714;
  stroke-dashoffset: 298.1371428256714;
}
  </style>
</head>

<body>



<audio src="" preload="none" id="listen"></audio>

<svg id="playable" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" class="not-started">
  <g class="shape">
    <circle class="progress-track" cx="50" cy="50" r="47.45" stroke="#000000" stroke-opacity="0.25" stroke-linecap="round" fill="none" stroke-width="1" />
    <circle class="precache-bar" cx="50" cy="50" r="47.45" stroke="#000000" stroke-opacity="0.25" stroke-linecap="round" fill="none" stroke-width="1" transform="rotate(-90 50 50)" />
    <circle class="progress-bar" cx="50" cy="50" r="47.45" stroke="#000000" stroke-opacity="1" stroke-linecap="round" fill="none" stroke-width="1" transform="rotate(-90 50 50)" />
  </g>
  <circle class="controls" cx="50" cy="50" r="45" stroke="none" fill="#000000" opacity="0.0" pointer-events="all" />
  <g class="control pause">
    <line x1="40" y1="35" x2="40" y2="65" stroke="#000000" fill="none" stroke-width="1" stroke-linecap="round" />
    <line x1="60" y1="35" x2="60" y2="65" stroke="#000000" fill="none" stroke-width="1" stroke-linecap="round" />
  </g>
  <g class="control play">
    <line x1="45" y1="35" x2="45" y2="65" stroke="#000000" fill="none" stroke-width="1" stroke-linecap="round" />
    <line x1="45" y1="65" x2="65" y2="50" stroke="#000000" fill="none" stroke-width="1" stroke-linecap="round" />
    <line x1="65" y1="50" x2="45" y2="35" stroke="#000000" fill="none" stroke-width="1" stroke-linecap="round" />
  </g>
  <g class="control stop">
    <rect x="35" y="35" width="30" height="30" stroke="#000000" fill="none" stroke-width="1" />
  </g>
</svg>

<script>
var playObj = document.getElementById("playable"),
  progress = playObj.querySelector(".progress-bar"),
  precache = playObj.querySelector(".precache-bar"),
  audioObj = document.getElementById("listen"),
  controlsObj = playObj.querySelector(".controls"),
  pt = playObj.createSVGPoint(),
  pc = 298.1371428256714; // 2 pi r

function cursorPoint(evt){
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(playObj.getScreenCTM().inverse());
 }
 function angle(ex, ey) {
  var dy = ey - 50; // 100;
  var dx = ex - 50; // 100;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  theta = theta + 90; // in our case we are animating from the top, so we offset by the rotation value;
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

// nice long audio for precache testing
//audioObj.setAttribute("src", "http://media.blubrry.com/stilluntitledwithadamsavage/files.tested.com/podcast/stilluntitled-20150922.mp3?" + Math.random());
audioObj.setAttribute("src", "onlymp3.to - MOUSE KILLER - ON KILL MICE -Very High Pitch Sound Noises-X52KcGTt5TA-256k-1656700897374.mp3" + Math.random());

// https://github.com/toddmotto/lunar/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.lunar = factory();
  }
})(this, function () {

  'use strict';

  var lunar = {};

  lunar.hasClass = function (elem, name) {
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(elem.getAttribute('class'));
  };

  lunar.addClass = function (elem, name) {
    !lunar.hasClass(elem, name) && elem.setAttribute('class', (!!elem.getAttribute('class') ? elem.getAttribute('class') + ' ' : '') + name);
  };

  lunar.removeClass = function (elem, name) {
    var remove = elem.getAttribute('class').replace(new RegExp('(\\s|^)' + name + '(\\s|$)', 'g'), '$2');
    lunar.hasClass(elem, name) && elem.setAttribute('class', remove);
  };

  lunar.toggleClass = function (elem, name) {
    lunar[lunar.hasClass(elem, name) ? 'removeClass' : 'addClass'](elem, name);
  };

  lunar.className = function (elem, name) {
    elem.setAttribute("class", name);
    console.log("className", elem);
  }

  return lunar;

});

function setGraphValue(obj, val) {
  var val = pc - parseFloat(((val / audioObj.duration) * pc), 10);
  obj.style.strokeDashoffset = val;
  if (val === 0) {
    lunar.addClass(obj,"done");
    if (obj===progress) lunar.className(playObj, "ended");
  }
}

audioObj.addEventListener('progress', function() {
  var end = audioObj.buffered.end(audioObj.buffered.length - 1);
  setGraphValue(precache, end);
});

function reportPosition() {
  setGraphValue(progress, audioObj.currentTime);
}

function positionListener(event) {
//   console.log("a",Math.sqrt((pc-loc.x)*(pc-loc.x) + (pc-loc.y)*    (pc-loc.y)));
  var loc = cursorPoint(event),
    deg = (angle(loc.x,loc.y) / 360),
    pct = pc * deg;
console.log(loc, deg);

// doo doo doo don't mind me, this code does nothing yet ...
}

// idea:
// use polar co ordinate conversion and convert the position as a percentage of 360 degrees... and draw it as an arc rather than a circle
// rather than extending the length of the dash
// http://stackoverflow.com/a/24569190/1238884


controlsObj.addEventListener("click", function(e) {
  switch (playObj.getAttribute("class")) {
    case "not-started":
      audioObj.addEventListener('timeupdate', reportPosition);
      precache.addEventListener("mousedown", positionListener, false);
      audioObj.play();
      playObj.setAttribute("class", "playing");
      break;
    case "playing":
      playObj.setAttribute("class", "paused");
      audioObj.pause();
      break;
    case "paused":
      playObj.setAttribute("class", "playing");
      audioObj.play();
      break;
    case "ended":
      playObj.setAttribute("class", "not-started");
      audioObj.removeEventListener('timeupdate', reportPosition);
      break;
  }
});
