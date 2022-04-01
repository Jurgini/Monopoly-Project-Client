"use strict";

document.addEventListener('DOMContentLoaded',init);

function init() {
    loadAvailableLobbies();
    document.querySelector('section#join-lobby-container form').addEventListener('submit', joinSelectedLobby);
    document.querySelector('section#create-game-container form').addEventListener('submit', createGame);
}