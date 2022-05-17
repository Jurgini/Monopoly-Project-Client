'use strict';

function createGame(e)
{
    e.preventDefault();

    const $lobbyName = document.querySelector('#lobby-name').value;
    const $playerName = document.querySelector('section#game-settings-container input#username').value;
    const $numberOfPlayers = document.querySelector('section#create-game-container input#amount-of-players').value;

    const gameBody = {
        "prefix": $lobbyName,
        "numberOfPlayers": parseInt($numberOfPlayers)
    };

    if (checkPlayerNameIsEmpty($playerName) === false)
    {
        fetchFromServer('/games', "POST", gameBody)
            .then(response => {
                joinGame($playerName, response.id);
            });
    }
}
