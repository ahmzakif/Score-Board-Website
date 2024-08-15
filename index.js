let scores = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
};

let timerInterval;
let startTime;
let elapsedTime = 0;

function updateScore(player) {
    document.getElementById(`${player}-score`).textContent = scores[player];
}

function add1(player) {
    scores[player] += 1;
    updateScore(player);
}

function subtract1(player) {
    scores[player] -= 1;
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
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById('timer-display').textContent = formatTime(elapsedTime);
        }, 10); // Update every 10 milliseconds
    }
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
