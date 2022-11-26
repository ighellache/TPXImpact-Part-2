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

//Constant variables of buttons initialized
// const buttonStart = document.getElementById('button-start');
// const buttonStop = document.getElementById('button-stop');
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

var numofclicks = 0;
playpause.addEventListener('click', () => {
    numofclicks ++;
  playpause.classList.toggle('playing');
  clearInterval(Interval);
  Interval = setInterval(startTimer,10);
  if (numofclicks%2){ //for every 2 clicks pause button is enabled. You can never double click play or pause, it will always toggle.
    console.log("Pause button activated");
  } else {
    clearInterval(Interval);
  }
});

//Play/Pause button
function change() {
    var x = document.getElementById("test");
    if (x.innerHTML === "Play") {
      x.innerHTML = "Pause";
    } else {
      x.innerHTML = "Play";
    }
  }

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
    lapNow = `<div class="lap">Lap ${lapCount}: ${hours <= 9 ? "0" + hours: hours}:${minutes <= 9 ? "0" + minutes: minutes}:${seconds <= 9 ? "0" + seconds: seconds}:${centiseconds <= 9 ? "0" + centiseconds: centiseconds}</div>`;
    laps.innerHTML += lapNow;
    console.log(laps);

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

function loadLapHistory() {
    //use instead of DOMcontent loaded 
    var laplist = storedlaps.split("Lap", storedlapcount+1); //using executeprogram knowledge
    laplist.shift(); //executeprogram knowledge
    console.log(laplist);
    laplist.forEach(lapitem =>
        document.getElementById('laps').innerHTML += `<div>
        Lap ${lapitem}</div>`);
}

//toggle dark mode 

function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var contrast = document.querySelector(".darkmodebtn");
    if (contrast.innerHTML === "Toggle dark mode") {
        contrast.innerHTML = "Toggle light mode";
      } else {
        contrast.innerHTML = "Toggle dark mode";
      }
 }

//clock


