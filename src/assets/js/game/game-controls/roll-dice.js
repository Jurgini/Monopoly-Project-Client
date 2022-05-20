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
        displayPopupAlert("move", "you have thrown " + (response.lastDiceRoll[0] + response.lastDiceRoll[1]), "Go").then(() => {
            if (response.directSale !== null) {
                let currentTile = response.players.find(player => player.name === game.playerName).currentTile;

                let method;
                displayPopupConfirm("Buy tile", `you have landed on ${currentTile} do you want to buy it?`, "buy", "don't buy").then(answer => {
                    if (answer.action === 'true') //
                    {
                        method = "POST";
                    } else {
                        method = "DELETE";
                    }
                    console.log(method);
                    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${currentTile}`, method).then(reloadGame);
                });

            } else {
                let currentTile = response.players.find(player => player.name === game.playerName).currentTile;

                for (let user of response.players) {
                    if (response.currentPlayer !== user.name) {
                        if (currentTile in user.properties) {
                            //displayPopupAlert("Pay rent",`You landed on ${response.directSale} you have to pay ${user}`);
                            fetchFromServer(`/games/${gameId}/players/${game.playerName}/properties/${currentTile}/visitors/${user.name}/rent`, 'DELETE').then(reloadGame);
                        }
                    }
                }
            }
        });
        return response;
    });
}
