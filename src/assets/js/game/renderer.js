'use strict';

function loadAvailableLobbies()
{
    const $container = document.querySelector('div#lobby-overview');
    fetchFromServer(`/games?started=false&prefix=${_config.gameprefix}`, 'GET')
        .then(availableGames =>
        {
            renderAvailableLobbies(availableGames, $container);
        });
}

function renderAvailableLobbies(availableGames, $container)
{
    availableGames.forEach(availableGame => {
        renderLobby(availableGame, $container);
    });
}

function renderLobby(availableGame, $container)
{
    const $template = document.querySelector('template').content.firstElementChild.cloneNode(true);
    $template.querySelector("span.data-lobby-name").textContent = availableGame.id;
    $template.setAttribute("data-lobbyid", availableGame.id);
    $template.querySelector("span.data-lobby-joined-currently").textContent = availableGame.players.length;
    $template.querySelector("span.data-lobby-max").textContent = availableGame.numberOfPlayers;

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}
