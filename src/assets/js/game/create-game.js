'use strict';

function createGame(e)
{
    e.preventDefault();

    const lobbyName = document.querySelector('form#join #lobby-name').value;
    const numberOfPlayers = document.querySelector('form#join #amount-of-players').value;

    const gameBody = {
        "prefix": _config.gameprefix,
        "numberOfPlayers": parseInt(numberOfPlayers)
    };


    fetchFromServer('/games', "POST", gameBody).then(response => {
        console.log(response);
    });
}
