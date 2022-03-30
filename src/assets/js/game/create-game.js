'use strict';

function createGame(e)
{
    e.preventDefault();

    const lobbyName = document.querySelector('form#create-game-container #lobby-name').value;
    const numberOfPlayers = document.querySelector('form#create-game-container #amount-of-players').value;

    const gameBody = {
        "prefix": _config.gameprefix + `_${lobbyName}`,
        "numberOfPlayers": parseInt(numberOfPlayers)
    };


    fetchFromServer('/games', "POST", gameBody).then(response => {
        // Use response to send the user to his created lobby
        console.log(response);
    });
}
