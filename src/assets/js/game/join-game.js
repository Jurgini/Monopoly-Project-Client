'use strict';
function joinSelectedLobby(e)
{
    e.preventDefault();

    const $selectedLobby = e.submitter.closest('div');
    const $selectedLobbyInfo = $selectedLobby.dataset;
    const $playerName = document.querySelector('section#game-settings-container input#username').value;
    if ($playerName !== "")
    {
        joinGame($playerName, $selectedLobbyInfo.gameid);
    }
    else
    {
        displayError("Username is required to join/create a game! (15 characters long)");
    }

}
function joinGame(playerName, gameId)
{
    const joinBody = {
        "playerName": playerName
    };

    fetchFromServer(`/games/${gameId}/players`, 'POST', joinBody)
        .then(response => {
            saveGameToStorage(playerName, gameId, response.token);
        })
        .catch(err => checkError('joinGame', err));
}

function saveGameToStorage(playerName, gameId, token)
{
    const createdGame = {
        "playerName": playerName,
        "gameId": gameId
    };

    const tokenObject = {
        "token":token
    };

    saveToStorage(_config.localStorageGameObject, createdGame);
    saveToStorage(_config.localStorageTokenObject, tokenObject);
    redirect('lobby.html');
}
