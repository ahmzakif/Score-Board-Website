let scores = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
};

let timerInterval;
let startTime;
let elapsedTime = 0;
let countdownTime = 0;
let mode = 'stopwatch';

function setMode(selectedMode) {
    mode = selectedMode;
    if (mode === 'timer') {
        document.getElementById('timer-input-container').style.display = 'block';
    } else {
        document.getElementById('timer-input-container').style.display = 'none';
    }
}

function updateScore(player) {
    document.getElementById(`${player}-score`).textContent = scores[player];
}

function add1(player) {
    scores[player] += 10;
    updateScore(player);
}

function subtract1(player) {
    scores[player] -= 10;
    updateScore(player);
}

function reset() {
    for (let player in scores) {
        scores[player] = 0;
        updateScore(player);
    }
    resetTimer();  // Reset timer when resetting scores
}

function startTimer() {
    if (!timerInterval) {
        if (mode === 'timer') {
            const minutes = parseInt(document.getElementById('minutes').value, 10);
            const seconds = parseInt(document.getElementById('seconds').value, 10);
            countdownTime = (minutes * 60 + seconds) * 1000; // Convert to milliseconds
            startTime = Date.now();
            timerInterval = setInterval(() => {
                elapsedTime = countdownTime - (Date.now() - startTime);
                if (elapsedTime <= 0) {
                    pauseTimer();
                    elapsedTime = 0;
                    playAlarm();  // Play alarm when time is up
                }
                document.getElementById('timer-display').textContent = formatTime(elapsedTime);
            }, 10);
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                document.getElementById('timer-display').textContent = formatTime(elapsedTime);
            }, 10);
        }
    }
}

function playAlarm() {
    let alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    elapsedTime = 0;
    document.getElementById('timer-display').textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10); // Divide by 10 to get two digits

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}
