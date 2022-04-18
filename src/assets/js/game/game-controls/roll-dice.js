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

            document.querySelector("button").hidden = false;
            console.log("Stap 3: Knop zichtbaar!");
            document.querySelector("button").addEventListener("click", rollDice);
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
    document.querySelector("button").hidden = true;
    console.log("Stap 6: Knop weg!");

    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/dice`, "POST").then(response => {
        console.log("Stap 7: Roll dice!");
        document.querySelector('#dice1').src = `assets/media/dices/${response.lastDiceRoll[0]}.png`;
        document.querySelector('#dice2').src = `assets/media/dices/${response.lastDiceRoll[1]}.png`;;

        console.log("Stap 8: Toon nummers gegooit!");

        return response;
    }).then(response => {
        console.log(response);
        if (response.directSale !== null) {
            let method = (confirm(`You want to buy ${response.directSale}?`)?"POST":"DELETE"); // temporary confirm function
            fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${response.directSale}`, method).then(reloadGame);
            console.log(`Stap 9: Verkoop is ${method}!`);
        } else {
            reloadGame();
        }
    });
}