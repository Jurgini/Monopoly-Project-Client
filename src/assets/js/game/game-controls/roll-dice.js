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
        displayPopupAlert("DICE", "You've rolled a:  " + (response.lastDiceRoll[0] + response.lastDiceRoll[1]), "Go").then(reloadGame).then(() => {            console.log(response.directSale);
            let currentTile = response.players.find(player => player.name === game.playerName).currentTile;

            if (response.directSale !== null && response.directSale === currentTile) {

                let method;
                displayPopupConfirm("PROPERTY", `You landed on ${currentTile}. Do you want to buy it?`, "buy", "don't buy").then(answer => {                    if (answer.action === 'true') //
                    {
                        method = "POST";
                    } else {
                        method = "DELETE";
                    }
                    fetchFromServer(`/games/${game.gameId}/players/${game.playerName}/properties/${currentTile}`, method).then(reloadGame);
                });

            } else {
                if (game.playerName === response.currentPlayer) {
                    let propertyTiles = ["RAILROAD", "STREET", "UTILITY"];

                    if (propertyTiles.includes(response.currentTileType))
                    {
                        displayPopupAlert("RENT", `You landed on ${currentTile}. You have to pay ${response.currentTileOwner}`,"pay");
                        fetchFromServer(`/games/${gameId}/players/${response.currentTileOwner}/properties/${currentTile}/visitors/${game.playerName}/rent`, 'DELETE').then(reloadGame);
                    }
                    // for (const user of response.players){
                    //     console.log(user.name);
                    //     if (user.properties.filter(property => property.name === currentTile).length > 0) {
                    //         console.log("BOEEJAA");
                    //         displayPopupAlert("RENT", `You landed on ${currentTile}. You have to pay ${user.name}`,"pay");
                    //         fetchFromServer(`/games/${gameId}/players/${user.name}/properties/${currentTile}/visitors/${game.playerName}/rent`, 'DELETE').then(reloadGame);
                    //     }
                    // }
                }
            }
        });
        return response;
    });
}
