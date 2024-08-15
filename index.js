let scores = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
};

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
}
