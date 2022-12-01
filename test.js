test("There is no limit in storing lap times", () => { 
  lapCount = 100;
  lapNow = `<div class="laptime" >Lap ${lapCount <= 9 ? "0" + lapCount: lapCount}: ${hours}:${minutes}:${seconds}:${cseconds}</div>`;
  laps.innerHTML += lapNow;
  
  // equal(result.textContent, taskInput.value);
  
});

test("Laps exceeding 100 or a 1000 do not change the alignment of the lap list", () => { 
  
  
  equal(result.textContent, taskInput.value);
  
});

test("Hour hand moves when hour is reached" , () => { 
  // set timer time to an hour or a few hours in

});
