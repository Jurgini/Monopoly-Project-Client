"use strict";
document.addEventListener("DOMContentLoaded", init);
loadTokenFromStorage();

const game = loadFromStorage(_config.localStorageGameObject);
const gameId = game.gameId;

function init() {
    reloadGame();
}

function reloadGame() {
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        getGameDetails();
        if (response.canRoll === true && response.currentPlayer === game.playerName) {
            const $diceButton = document.querySelector("#dice-box button");
            $diceButton.hidden = false;
            $diceButton.addEventListener("click", rollDice);

            const $bankruptButton = document.querySelector("#bankruptcy button");
            $bankruptButton.hidden = false;
            $bankruptButton.addEventListener('click', proposeBankruptcy);

        } else {
            setTimeout(reloadGame, _config.delay);
        }
    });
}

function rollDice() {
    document.querySelector("#dice-box button").hidden = true;
    document.querySelector("#bankruptcy button").hidden = true;

    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/dice`, "POST").then(response => {
        const dice = response.lastDiceRoll;
        let i = 0;
        document.querySelectorAll('#dice-box img').forEach(($img) => {
            $img.setAttribute('src', `assets/media/dices/${dice[i]}.png`);
            $img.setAttribute('alt', dice[i]);
            $img.setAttribute('title', dice[i]);
            i++;
        });

        return response;

    }).then(response => {
        if (response.directSale !== null) {
            let method = (confirm(`You want to buy ${response.directSale}?`) ? "POST" : "DELETE"); // temporary confirm function
            fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${response.directSale}`, method).then(reloadGame);
        } else {
            reloadGame();
        }
    });
}
