"use strict";
document.addEventListener('DOMContentLoaded', init);
loadTokenFromStorage();

function init() {
    initLobby();
}

function initLobby() {
    const GAME_ID = loadFromStorage(_config.localStorageGameObject).gameId;
    displayLobbyId(GAME_ID);
    loadPlayers(GAME_ID);
}

function displayLobbyId(gameId) {
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        document.querySelector("span#gameid").innerHTML = gameId;
        document.querySelector("main .amountOfPlayers").innerHTML = `${response.players.length}/${response.numberOfPlayers}`;
    });
}

function loadPlayers(gameId) {
    const $container = document.querySelector('div.players');
    fetchFromServer(`/games/${gameId}`, 'GET').then(response => {
        showPlayers(response.players, $container);
        displayLobbyId(gameId);
        if (response.players.length === response.numberOfPlayers) {
            setTimeout(() => redirect("choose-pawn.html"), 5000);
        } else {
            setTimeout(() => loadPlayers(gameId), _config.delay);
        }
    });
}

function showPlayers(playersInGame, $container) {
    $container.innerHTML = $container.querySelector("template").outerHTML;
    playersInGame.forEach(player => {
        showPlayer(player, $container);
    });
}
function showPlayer(player, $container) {
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('.playername').textContent = player.name;
    if (player.name === loadFromStorage("game").playerName) {
        $template.querySelector('.player h3').removeAttribute("hidden");
    }
    $container.insertAdjacentHTML("beforeend", $template.outerHTML);
}