'use strict';

function loadAvailableLobbies()
{
    const $container = document.querySelector('div#lobby-overview');
    fetchFromServer(`/games`, 'GET')
        .then(availableGames =>
        {
            renderAvailableLobbies(availableGames, $container);

            if (true) // Infinite refresh of lobbies
            {
                setTimeout(() => loadAvailableLobbies(), 3500);
            }
        });
}

function renderAvailableLobbies(availableGames, $container)
{
    $container.innerHTML = $container.querySelector("template").outerHTML;
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
}
