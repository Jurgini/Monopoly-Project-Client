'use strict';

function createGame(e)
{
    e.preventDefault();

    // Reactivate when we have own server
    //const lobbyName = document.querySelector('form#create-game-container #lobby-name').value;
    const numberOfPlayers = document.querySelector('form#create-game-container #amount-of-players').value;

    const gameBody = {
        "prefix": _config.gameprefix, // TODO: Enable this again when we use our own server (check on name before '.' not '_'+ `.${lobbyName}`,
        "numberOfPlayers": parseInt(numberOfPlayers)
    };


    fetchFromServer('/games', "POST", gameBody).then(response => {
        // Use response to send the user to his created lobby
        console.log(response);
    });
}
