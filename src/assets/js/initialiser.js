"use strict";

document.addEventListener('DOMContentLoaded',init);

function init(){
    testConnection();
    loadGames();
    loadAvailableLobbies();
    document.querySelector('section#join-lobby-container form').addEventListener('submit', joinSelectedLobby);
    document.querySelector('section#create-game-container form').addEventListener('submit', createGame);
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
