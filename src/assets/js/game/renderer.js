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
    const $lobbyInfo = $template.querySelector("p.lobby-info");
    const $lobbyPlayerInfo = $template.querySelector("p.lobby-player-info");
    $lobbyInfo.innerHTML = `${availableGame.id}`;
    $lobbyInfo.title = `${availableGame.id}`;
    $lobbyPlayerInfo.innerHTML = `${availableGame.players.length}/${availableGame.numberOfPlayers}`;
    $template.setAttribute("data-gameid", availableGame.id);

    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
    console.log(loadTokenFromStorage());
}
