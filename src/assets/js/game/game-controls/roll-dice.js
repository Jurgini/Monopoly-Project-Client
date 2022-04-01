"use strict";
document.addEventListener("DOMContentLoaded", init);
loadTokenFromStorage();

const game = loadFromStorage(_config.localStorageGameObject);
const gameId = game.gameId

function init() {
    //document.querySelector("#roll-dice").addEventListener("click",rollDice);
    reloadGame();
    document.querySelector("button").addEventListener("click",rollDice);
}

function reloadGame() {
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        console.log(response);
        if (response.currentPlayer === game.playerName) {
            console.log("This players turn");
            document.querySelector("button").hidden = false;
        }
        else {
            console.log("Other players turn!");
            document.querySelector("button").hidden = true;
            setTimeout(()=>reloadGame(gameId),_config.delay);
        }
    });
}

function rollDice() {
    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/dice`,"POST").then(response=>{
       document.querySelector('div').innerHTML = response.lastDiceRoll;
       return response;
    }).then(response => {
        fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${response.directSale}`, 'DELETE');
        reloadGame();
    });
}