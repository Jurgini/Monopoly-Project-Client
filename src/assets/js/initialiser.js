"use strict";
const _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    testConnection();
    initLobby()
    loadGames();
    loadAvailableLobbies();
    document.querySelector('form#join-game-container').addEventListener('submit', joinGame);
    document.querySelector('form#create-game-container').addEventListener('submit', createGame);
}

function testConnection(){
    fetchFromServer('/tiles','GET').then(tiles => console.log(tiles)).catch(errorHandler);
}

// TO DELETE, ONLY FOR TESTING PURPOSES
function loadGames()
{
    fetchFromServer('/games?prefix=group18', "GET").then(response => {
        console.log(response);
    });
}
