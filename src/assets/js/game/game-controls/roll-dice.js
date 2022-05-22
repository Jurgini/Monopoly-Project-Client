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
            reloadGame()
            console.log(response)
            let currentTile = response.currentTile.name;

            if (response.directSale !== null && response.directSale === currentTile) {
                let method;
                displayPopupConfirm("PROPERTY",`You landed on ${currentTile}. Do you want to buy it for €${response.currentTile.cost}?`, "buy", "don't buy").then(answer => {
                    if (answer.action === 'true')
                    {
                        method = "POST";
                    } else {
                        method = "DELETE";
                    }
                    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${currentTile}`, method).then(reloadGame);
                });

            } else {
                console.log("current player: " + response.currentPlayer);
                console.log("tile: " + response.currentTile.name);
                console.log("tile owner: " + response.currentTileOwner);
                if (response.directSale === null)
                {
                    const propertyTypes = ["STREET", "RAILROAD", "UTILITY"];
                    let currentTileType = response.currentTile.type.toUpperCase().replace(" ", "_");

                    if (game.playerName !== response.currentTileOwner && propertyTypes.includes(currentTileType))
                    {
                        displayPopupAlert("RENT", `You landed on ${currentTile}. You have to pay ${response.currentTileOwner}, €${response.currentTile.rent}`, "pay");
                        fetchFromServer(`/games/${gameId}/players/${response.currentTileOwner}/properties/${currentTile}/visitors/${game.playerName}/rent`, 'DELETE').then(reloadGame);
                    }
                }
            }
        return response;
        });
}
