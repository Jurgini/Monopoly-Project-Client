"use strict";
document.addEventListener("DOMContentLoaded", init);
loadTokenFromStorage();

const game = loadFromStorage(_config.localStorageGameObject);
const gameId = game.gameId;
let previousResponse = null;

function init() {
    reloadGame();
}

// TODO: clean the code
function reloadGame() {
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        if (previousResponse === null) {
            previousResponse = response;
        } else if (previousResponse.turns.length !== response.turns.length) {
            previousResponse = response;
            getGameDetails();
        }
        if (response.canRoll === true && response.currentPlayer === game.playerName) {

            document.querySelector("#dice-box button").hidden = false;
            document.querySelector("#dice-box button").addEventListener("click", rollDice);
        } else {
            setTimeout(reloadGame, _config.delay);
        }
    });
}

function rollDice() {
    document.querySelector("#dice-box button").hidden = true;

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
        displayPopupAlert("move", "you have thrown " + (response.lastDiceRoll[0] + response.lastDiceRoll[1]), "Go");
        return response;
    }).then(response => {
        if (response.directSale !== null) {

            let method;
            displayPopupConfirm("Buy tile", `you have landed on ${response.directSale} do you want to buy it?`, "buy", "don't buy").then(answer => {
                if(answer) //
                {
                    method = "POST";
                } else {
                    method = "DELETE";
                }
                fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${response.directSale}`, method).then(reloadGame);
            });

        } else {
            let currentTile = response.players.find(player => player.name === response.currentPlayer).currentTile;

            for (let user in response.players) {
                if (response.currentPlayer !== user.name) {
                    if (currentTile in user.properties){
                        //displayPopupAlert("Pay rent",`You landed on ${response.directSale} you have to pay ${user}`);
                        fetchFromServer(`/games/${gameId}/players/${game.playerName}/properties/${currentTile}/visitors/${user.name}/rent`, 'DELETE').then(reloadGame);
                    }
                }
            }
        }
    });
}
