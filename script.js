let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapTimes = [];

const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lap-list');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    const lapTime = elapsedTime;
    lapTimes.push(lapTime);
    addLap(lapTime);
  }
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapTimes = [];
  display.textContent = '00:00:00.000';
  lapList.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  display.textContent = formattedTime;
}

function addLap(lapTime) {
  const formattedLapTime = convertMilliseconds(lapTime);
  const lapListItem = document.createElement('li');
  lapListItem.textContent = `Lap: ${formattedLapTime}`;
  lapList.appendChild(lapListItem);
}

function convertMilliseconds(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
