'use strict';

function loadAvailableLobbies()
{
    const $container = document.querySelector('div#lobby-overview');
    fetchFromServer(`/games?started=false&prefix=${_config.gameprefix}`, 'GET') // TODO: When we have our own server this needs to be changed to the lobbyName feature
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
    const $lobbyInfo = $template.querySelector("label.lobby-info");
    $lobbyInfo.innerHTML = `${availableGame.id} - ${availableGame.players.length}/${availableGame.numberOfPlayers}`;
    $lobbyInfo.setAttribute("data-lobbyid", availableGame.id);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}
