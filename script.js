//Initialize variables outside functions to be used globally
//Integer variables, let allows the variable to change
let hours = 00;
let minutes = 00;
let seconds = 00; 
let centiseconds = 00; 

//These variables allows selected DOM elements to change 
let appendHours = document.getElementById("hours");
let appendMinutes = document.getElementById("minutes");
let appendSeconds = document.getElementById("seconds");
let appendCentiseconds = document.getElementById("centiseconds");


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
      clearInterval(Interval);
      Interval = setInterval(startTimer,10);
      setTimeout(startClock, 20); //to ensure clock runs same rate as timer
    } else {
      x.innerHTML = "Play";
      clearInterval(Interval);
      pauseClock();
    }
  }

// function hideshow() {
//   var analog = document.getElementById("analog");
//   if (analog.style.display === "none") {
//     analog.style.display = "block";
//   } else {
//     analog.style.display = "none";
//   }
// } causes the hands to move

buttonReset.onclick = function() {
    window.clearInterval(Interval);
    centiseconds = "00";
    seconds = "00";
    minutes = "00";
    hours = "00";
    appendCentiseconds.innerHTML = centiseconds;
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    appendHours.innerHTML = hours;
    window.location.reload(); //to prevent 000:000:000:00 from happening
    
}

//Timer function
function startTimer () { //change to switch cases at the end
    centiseconds++; 
    
    if (centiseconds <= 9){
        appendCentiseconds.innerHTML = "0" + centiseconds;
    }
    
    else if (centiseconds > 9){
        appendCentiseconds.innerHTML = centiseconds;
    
    } 
    
    if (centiseconds > 99) { //start counting for the seconds (100 cs in a second)
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        centiseconds = 0;
        appendCentiseconds.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59){ //60 seconds in a minute
        //console.log(seconds) was slowing it down as the script runs synchronously
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        centiseconds = 0;
        seconds = 0;
        appendCentiseconds.innerHTML = "0" + 0;
        appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 59){ //60 minutes in an hour
        console.log("hours");
        hours++;
        appendHours.innerHTML = "0" + hours;
        centiseconds = 0;
        seconds = 0;
        minutes = 0;
        appendCentiseconds.innerHTML = "0" + 0;
        appendSeconds.innerHTML = "0" + 0;
        appendMinutes.innerHTML = "0" + 0;
        appendHours.innerHTML = hours;
    }

}


//wanted to provide an alternative way of adding functionality to a button
function lap()  { 
    lapCount ++;
    //anything inside the template literal/placeholder is treated as Javascript
    //I used ternary operators to preserve the format of the time. E.g. 0:0:12:59 was previously shown
    lapNow = `<div class="laptime" >Lap ${lapCount <= 9 ? "0" + lapCount: lapCount}: ${hours <= 9 ? "0" + hours: hours}:${minutes <= 9 ? "0" + minutes: minutes}:${seconds <= 9 ? "0" + seconds: seconds}:${centiseconds <= 9 ? "0" + centiseconds: centiseconds}</div>`;
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

//toggle Light/Dark mode with localstorage to remember the theme for next time
const switchTheme = (evt) => {
	const switchBtn = evt.target;
	if (switchBtn.textContent.toLowerCase() === "light") {
		switchBtn.textContent = "dark";
		localStorage.setItem("theme", "dark");
		document.documentElement.setAttribute("data-theme", "dark");
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

//----------Analog stopwatch feature---------------------------------
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
function startClock(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    paused = 0;
    running = 1;

  }
}
function pauseClock(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  } else {
// if the timer was already paused, when they click pause again, start the timer again
startTimer();
  }
}
function resetClock(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
}
function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  //var cseconds = Math.floor((difference % (1000 * 60)) / 10);

	const deg = 6;
	const hour = document.querySelector(".hour");
	const min = document.querySelector(".min");
	const sec = document.querySelector(".sec");

	let day = new Date();
	let hh = hours * 30;
	let mm = minutes * deg;
	let ss = seconds * deg;

	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	min.style.transform = `rotateZ(${mm}deg)`;
	sec.style.transform = `rotateZ(${ss}deg)`;
};

//test could be rotate the hour

