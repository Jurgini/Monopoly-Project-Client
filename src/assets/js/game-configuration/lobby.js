"use strict";
const _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    initLobby();
}

function initLobby()
{
    let lobbyId = 'group18_288';

    displayLobbyId(lobbyId);
    loadPlayers(lobbyId);
}

function displayLobbyId(lobbyId)
{
    fetchFromServer(`/games?prefix=${lobbyId}`,'GET').then(response => {
      document.querySelector("span#gameid").innerHTML=response[0].id;
    });
}

function loadPlayers(lobbyId)
{
    const $container = document.querySelector('div.players');
    fetchFromServer(`/games?prefix=${lobbyId}`,'GET').then(response => {
        showPlayers(response[0].players, $container);
    });
}

function showPlayers(playersInGame,$container)
{
    console.log(playersInGame);
    playersInGame.forEach(player => {
        showPlayer(player,$container);
    });
}

function showPlayer(player, $container)
{
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector('span.playername').textContent = player.name;
    $container.insertAdjacentHTML("beforeend", $template.outerHTML);

}
