'use strict';
document.addEventListener('DOMContentLoaded', getGameDetails);
loadTokenFromStorage();

function getGameDetails()
{
    fetchFromServer(`/games/${loadFromStorage('game').gameId}`, 'GET')
        .then(onGoingGame => {
            console.log(onGoingGame);
        });
}