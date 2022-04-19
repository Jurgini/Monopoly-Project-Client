"use strict";
document.addEventListener("DOMContentLoaded", init);
loadTokenFromStorage();

const game = loadFromStorage(_config.localStorageGameObject);
const gameId = game.gameId

function init() {
    //document.querySelector("#roll-dice").addEventListener("click",rollDice);
    reloadGame();
}

function reloadGame() {
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        console.log("Stap 1: Game response");
        if (response.canRoll === true && response.currentPlayer === game.playerName) {
            console.log("Stap 2: This players turn");

            document.querySelector("#dice-box button").hidden = false;
            console.log("Stap 3: Knop zichtbaar!");
            document.querySelector("#dice-box button").addEventListener("click", rollDice);
            console.log("Stap 4: Knop kan gebruikt worden!");
        } else {
            console.log("Stap 2: Other players turn!");
            setTimeout(reloadGame, _config.delay);
            console.log("Stap 3: Reload Game");
        }
    });
}

function rollDice() {
    console.log("Stap 5: Knop wordt gebruikt!");
    document.querySelector("#dice-box button").hidden = true;
    console.log("Stap 6: Knop weg!");

    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/dice`, "POST").then(response => {
        console.log("Stap 7: Roll dice!");
        const dice = response.lastDiceRoll;
            let i = 0;
            document.querySelectorAll('#dice-box img').forEach(($img) => {
                $img.setAttribute('src', `assets/media/dices/${dice[i]}.png`);
                $img.setAttribute('alt', dice[i]);
                $img.setAttribute('title', dice[i]);
                i++;
            });

        console.log("Stap 8: Toon nummers gegooit!");

        return response;
    }).then(response => {
        console.log(response);
        if (response.directSale !== null) {
            let method = (confirm(`You want to buy ${response.directSale}?`) ? "POST" : "DELETE"); // temporary confirm function
            fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${response.directSale}`, method).then(reloadGame);
            console.log(`Stap 9: Verkoop is ${method}!`);
        } else {
            reloadGame();
        }
    });
}