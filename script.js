//Initialize variables outside functions to be used globally
//Could use var instead for global scope but from my learning const is used when a variable isn't physically changed 
//and let is used when the variable can be changed.

const buttonReset = document.getElementById('button-reset');
const buttonLap = document.getElementById('button-lap');
const buttonClearLaps = document.getElementById('button-clearlap');

//Variables to store lap times
const laps = document.getElementById("laps");
const lapRecord = document.getElementById('lapRecord');

//Time interval
let Interval; //same as let Interval = null;

//These variables will be used for the lap function
let lapNow; //same as let lap = null;
let lapCount = 0;

//Using my creativity here. Play/pause button
const playpause = document.querySelector('.playpause');

//Play/Pause button
function change() {
    var x = document.getElementById("playpausebtn");
    if (x.innerHTML === "Play") {
      x.innerHTML = "Pause";
      playpause.classList.toggle('playing');
      start();
    } else {
      x.innerHTML = "Play";
      pause();
    }
  }

// function hideshow() {
//   var analog = document.querySelector("clock");
//   if (analog.style.display === "block") {
//     analog.style.display = "none";
//   } else {
//     analog.style.display = "block";
//   }}
// } causes the clock hands to move

buttonReset.onclick = function() {
  reset();
}

//wanted to provide an alternative way of adding functionality to a button
//This function displays the lap times when lap button is clicked and adds laps to local storage 
function lap()  { 
    lapCount ++;
    //anything inside the template literal/placeholder is treated as Javascript
    //I used a ternary operator (acts like a conditional statement) maintain consistent alignment of laptimes so all lap counts are displayed to two digits
    lapNow = `<div class="laptime" >Lap ${lapCount <= 9 ? "0" + lapCount: lapCount}: ${hours}:${minutes}:${seconds}:${cseconds}</div>`;
    laps.innerHTML += lapNow;
    //console.log(laps);

    //Using localstorage for laps
    localStorage.setItem('laps', (laps.textContent));
    localStorage.setItem('numoflaps', (lapCount));
} 

buttonLap.addEventListener('click', lap); //alternative could be adding onclick=lap() in the html

//clearlaps
buttonClearLaps.onclick = function() {
    lapCount = 0;
    laps.innerHTML = ''; 
    localStorage.clear()
    console.log("Local storage cleared");
    
}

//Using local storage to preserve lap history
var storedlaps = localStorage.getItem('laps');
var storedlapcount = localStorage.getItem('numoflaps');

document.addEventListener("DOMContentLoaded", () => {
    console.log(storedlaps);
    console.log(storedlapcount);
    loadLapHistory();
})

function loadLapHistory() { //using executeprogram knowledge
    var laplist = storedlaps.split("Lap", storedlapcount+1); 
    laplist.shift(); 
    console.log(laplist);
    laplist.forEach(lapitem =>
        document.getElementById('laps').innerHTML += `<div>
        Lap ${lapitem}</div>`);
}

//toggle Light/Dark mode with localstorage to remember the theme on page reload
const switchTheme = (evt) => {
	const switchBtn = evt.target;
	if (switchBtn.textContent.toLowerCase() === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
		switchBtn.textContent = "dark"; //try to make this asynchronous cos you have to press twice
		localStorage.setItem("theme", "dark");
		
	} else {
		switchBtn.textContent = "light";
		localStorage.setItem("theme", "light"); 
		document.documentElement.setAttribute("data-theme", "light");
	}
};

const switchModeBtn = document.querySelector(".switch-btn");
switchModeBtn.addEventListener("click", switchTheme, false);

let currentTheme = "light";
currentTheme = localStorage.getItem("theme")
	? localStorage.getItem("theme")
	: null;

if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);
	switchModeBtn.textContent = currentTheme;
}

//----------Timer feature---------------------------------
let elapsed = 0;
var interval;
let timerDisplay = document.getElementById("time");

function start() {
  let startTime = Date.now() - elapsed;
  interval = setInterval(() => {
    elapsed = Date.now() - startTime;
    displayTime(elapsed);
  }, 10);
}

function pause() {
  clearInterval(interval);
}

function reset() {
  clearInterval(interval);
  elapsed = 0;
  displayTime(0);
}

function displayTime(time) {
  //I wanted to use these variables outside the function so I made them global.
  window.cseconds = Math.floor((time % 1000) / 10); 
  window.seconds = Math.floor(time / 1000) % 60;
  window.minutes = Math.floor(time / 60000) % 60;
  window.hours = Math.floor(time / 3600000) % 60;
  
  cseconds = cseconds < 10 ? "0" + cseconds : cseconds; //ternary operators used to maintain 00:00:00:00 structure
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  timerDisplay.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + cseconds;

	const deg = 6;
	const hour = document.querySelector(".hour");
	const min = document.querySelector(".min");
	const sec = document.querySelector(".sec");

	let hh = hours * 30;
	let mm = minutes * deg;
	let ss = seconds * deg;

	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	min.style.transform = `rotateZ(${mm}deg)`;
	sec.style.transform = `rotateZ(${ss}deg)`;
};

