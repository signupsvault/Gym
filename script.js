let timer = null; // Holds the timer interval
let timeElapsed = 0; // Time elapsed in seconds
const maxPreviousTimes = 3; // Number of previous times to display

const clock = document.getElementById('clock');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timeList = document.getElementById('timeList');

// Update the clock display
function updateClock() {
  const minutes = String(Math.floor(timeElapsed / 60)).padStart(2, '0');
  const seconds = String(timeElapsed % 60).padStart(2, '0');
  clock.textContent = `${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
  if (timer !== null) return; // Prevent multiple intervals
  timer = setInterval(() => {
    timeElapsed++;
    updateClock();
  }, 1000);
}

// Stop the timer and reset to zero
function stopTimer() {
  clearInterval(timer);
  timer = null; // Clear the interval reference
  timeElapsed = 0; // Reset the elapsed time
  updateClock(); // Update the clock display
  startBtn.textContent = 'Start'; // Change Reset back to Start
}

// Reset the timer without stopping
function resetTimer() {
  savePreviousTime(); // Save the current time to the previous times list
  clearInterval(timer); // Stop the current timer
  timer = null; // Clear the interval reference
  timeElapsed = 0; // Reset the elapsed time
  updateClock(); // Update the clock display
  startTimer(); // Automatically start the timer again
}

// Save the current time to the previous times list
function savePreviousTime() {
  if (timeElapsed === 0) return; // Skip saving if timer is already at zero

  const minutes = String(Math.floor(timeElapsed / 60)).padStart(2, '0');
  const seconds = String(timeElapsed % 60).padStart(2, '0');
  const timeString = `${minutes}:${seconds}`;

  const listItem = document.createElement('li');
  listItem.textContent = timeString;

  timeList.prepend(listItem);

  // Limit to the last 3 times
  if (timeList.children.length > maxPreviousTimes) {
    timeList.removeChild(timeList.lastChild);
  }
}

// Event listener for Start/Reset button
startBtn.addEventListener('click', () => {
  if (startBtn.textContent === 'Start') {
    startTimer();
    startBtn.textContent = 'Reset';
  } else {
    resetTimer();
  }
});

// Event listener for Stop button
stopBtn.addEventListener('click', () => {
  stopTimer();
});


// Function to update the current time on the screen in AM/PM format
function updateCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${period}`;

  document.getElementById('currentTime').textContent = timeString;
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Call it immediately to set the initial time
updateCurrentTime();
