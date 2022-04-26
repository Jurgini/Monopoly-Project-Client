'use strict';
function joinSelectedLobby(e)
{
    e.preventDefault();

    const $selectedLobby = e.submitter.closest('div');
    const $selectedLobbyInfo = $selectedLobby.dataset;
    const $playerName = document.querySelector('section#game-settings-container input#username').value;
    if (checkPlayerNameIsEmpty($playerName) === false)
    {
        joinGame($playerName, $selectedLobbyInfo.gameid);
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

function checkPlayerNameIsEmpty($playerName)
{
    if ($playerName !== "")
    {
        return false;
    }
    displayError("Username is required to join/create a game! (15 characters long)");
    return true;
}

