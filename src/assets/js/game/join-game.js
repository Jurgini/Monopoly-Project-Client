'use strict';
function joinSelectedLobby(e)
{
    e.preventDefault();

    const selectedLobby = e.submitter.closest('div');
    const selectedLobbyInfo = selectedLobby.dataset;
    const playerName = document.querySelector('section#game-settings-container input#username').value;

    joinGame(playerName, selectedLobbyInfo.gameid);
}
function joinGame(playerName, gameId)
{
    const joinBody = {
        "playerName": playerName
    };

    fetchFromServer(`/games/${gameId}/players`, 'POST', joinBody)
        .then(response => {
            saveGameToStorage(playerName, gameId, response.token);
        });
}

function saveGameToStorage(playerName, gameId, token)
{
    const createdGame = {
        "playerName": playerName,
        "gameId": gameId,
        "token": token
    };

    saveToStorage(_config.localStorageGameObject, createdGame);
    setTimeout(function() {redirect('lobby.html');},5000);
}

function redirect(path)
{
    window.location.href = path;
}



