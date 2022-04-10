'use strict';
document.addEventListener('DOMContentLoaded', getGameDetails);
loadTokenFromStorage();

function getGameDetails()
{
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            console.log(onGoingGame);
            const players = onGoingGame.players;
            renderPlayersInfo(players);
        });
}

function renderPlayersInfo(playersInOnGoingGame)
{
    playersInOnGoingGame.forEach(player => {
        const $container = document.querySelector('div#players-container');
        const playerPawns = loadFromStorage('pawns');
        let playerPawn;
        playerPawns.forEach(distribution =>
        {
            if (distribution.player === player.name)
            {
                playerPawn = distribution.pawn;
            }
        });

        renderPlayerInfo(player, playerPawn, $container);
    });
}

function renderPlayerInfo(playerInOnGoingGame, playerPawn, $container)
{
    const $template = document.querySelector('template#player-info-template').content.firstElementChild.cloneNode(true);
    const $pawn = $template.querySelector('img');
    // TODO: If this is the turn taking player add class: player-taking-turn
    $pawn.setAttribute('src', `images/pawns/${playerPawn.id}.png`);
    $pawn.setAttribute('alt', playerPawn.displayName);
    $pawn.setAttribute('title', playerPawn.displayName);
    $template.querySelector('.player-balance').textContent = `${playerInOnGoingGame.name}: €${playerInOnGoingGame.money}`;
    $container.insertAdjacentHTML('beforeend', $template.outerHTML);
}